<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // ==== CUSTOMER: list my orders ====
    public function index(Request $r) {
        return $r->user()->orders()->with('items.menuItem')->latest()->get();
    }

    // ==== CUSTOMER: place order ====
    public function store(Request $r) {
        $payload = $r->validate([
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'required|integer|exists:menu_items,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($r, $payload) {
            $user = $r->user();
            $ids = collect($payload['items'])->pluck('menu_item_id')->unique()->values();
            $menuItems = MenuItem::whereIn('id', $ids)->get()->keyBy('id');

            $order = Order::create([
                'user_id' => $user->id,
                'total'   => 0,
                'status'  => 'pending',
            ]);

            $total = 0;
            foreach ($payload['items'] as $row) {
                $mi = $menuItems[$row['menu_item_id']];
                $linePrice = $mi->price * $row['qty'];
                $total += $linePrice;

                OrderItem::create([
                    'order_id'     => $order->id,
                    'menu_item_id' => $mi->id,
                    'qty'          => $row['qty'],
                    'price'        => $mi->price, // snapshot
                ]);
            }

            $order->update(['total' => $total]);

            return $order->load('items.menuItem');
        });
    }

    // ==== STAFF: list all orders with JOINs ====
    public function staffIndex(Request $r)
    {
        $orders = DB::table('orders as o')
            ->join('users as u', 'u.id', '=', 'o.user_id')
            ->join('order_items as oi', 'oi.order_id', '=', 'o.id')
            ->join('menu_items as mi', 'mi.id', '=', 'oi.menu_item_id')
            ->select(
                'o.id',
                'o.status',
                'o.created_at',
                'u.name as customer',
                'u.email',
                DB::raw('SUM(oi.qty * oi.price) as total'),
                DB::raw("GROUP_CONCAT(CONCAT(mi.name,' x',oi.qty) SEPARATOR ', ') as items_list")
            )
            ->groupBy('o.id','o.status','o.created_at','u.name','u.email')
            ->orderByDesc('o.created_at')
            ->get();

        return response()->json($orders);
    }

    // ==== STAFF: update order status ====
    public function updateStatus(Request $r, $orderId)
    {
        $data = $r->validate([
            'status' => 'required|in:pending,paid,served,delivered,cancelled'
        ]);

        $updated = DB::table('orders')->where('id', $orderId)->update([
            'status'     => $data['status'],
            'updated_at' => now(),
        ]);

        if (!$updated) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        return response()->json(['ok' => true]);
    }

    // ==== STAFF: dashboard summary ====
    public function summary()
    {
        $today = now()->toDateString();

        $todayTotal = DB::table('orders')->whereDate('created_at', $today)->count();
        $pending    = DB::table('orders')->where('status','pending')->count();
        $delivered  = DB::table('orders')->whereIn('status',['served','delivered'])->count();
        $activeStaff= DB::table('users')->where('role','staff')->count();

        return compact('todayTotal','pending','delivered','activeStaff');
    }
}
