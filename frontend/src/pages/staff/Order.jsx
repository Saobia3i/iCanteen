// src/pages/staff/Order.jsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box, Card, CardContent, CardHeader, Typography,
  TextField, MenuItem, Select, InputLabel, FormControl,
  List, ListItem, ListItemText, Button, Stack
} from '@mui/material';
import {
  Search, FilterList, AccessTime, CheckCircle,
  LocalShipping, Inventory2
} from '@mui/icons-material';
import api from '../../lib/api';

export default function Order() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/staff/orders'); // needs staff token
      const mapped = (data || []).map(o => ({
        id: o.id,
        customer: o.customer,
        items: (o.items_list || '').split(', ').filter(Boolean),
        total: Number(o.total || 0),
        status: (o.status || '').charAt(0).toUpperCase() + (o.status || '').slice(1),
        orderTime: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        phone: o.email,
        address: '—',
        estimatedDelivery: '',
        deliveredTime: '',
        rawStatus: (o.status || '').toLowerCase(),
      }));
      setRows(mapped);
    } catch (e) {
      console.error("ORDERS_ERR", e?.response?.status, e?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ loadOrders(); }, []);

  const filteredOrders = useMemo(()=>{
    const s = searchTerm.toLowerCase();
    return rows.filter(order => {
      const matchesSearch =
        order.customer.toLowerCase().includes(s) ||
        String(order.id).toLowerCase().includes(s);
      const matchesStatus =
        statusFilter === 'all' || order.rawStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rows, searchTerm, statusFilter]);

  const pendingCount   = rows.filter(o => o.rawStatus === 'pending').length;
  const deliveredCount = rows.filter(o => o.rawStatus === 'delivered' || o.rawStatus === 'served').length;

  const setStatus = async (orderId, status) => {
    try {
      await api.put(`/staff/orders/${orderId}/status`, { status }); // pending/delivered/served/paid/cancelled
      setRows(prev => prev.map(o =>
        o.id === orderId
          ? { ...o, rawStatus: status, status: status.charAt(0).toUpperCase()+status.slice(1) }
          : o
      ));
    } catch (e) {
      console.error("STATUS_ERR", e?.response?.status, e?.response?.data);
      alert(e?.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <Box
      p={3}
      sx={{
        width: '100%',
        maxWidth: { lg: '1200px' },
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Stats */}
      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        <Card sx={{ width: 250, border: '1px solid #2196f3' }}>
          <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: 48, height: 48, backgroundColor: '#2196f3', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Inventory2 />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Total Orders</Typography>
              <Typography variant="h5" fontWeight="bold">{rows.length}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: 250, border: '1px solid #ff9800' }}>
          <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: 48, height: 48, backgroundColor: '#ff9800', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <AccessTime />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Pending</Typography>
              <Typography variant="h5" fontWeight="bold" color="#ff9800">{pendingCount}</Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ width: 250, border: '1px solid #4caf50' }}>
          <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ width: 48, height: 48, backgroundColor: '#4caf50', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <CheckCircle />
            </Box>
            <Box>
              <Typography variant="body2" color="textSecondary">Delivered</Typography>
              <Typography variant="h5" fontWeight="bold" color="#4caf50">{deliveredCount}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Filters */}
      <Card sx={{ width: '100%', maxWidth: 800 }}>
        <CardContent sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search by customer or order ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
            sx={{ flex: 1, minWidth: 200 }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={e => setStatusFilter(e.target.value)}
              size="small"
              startAdornment={<FilterList sx={{ mr: 1 }} />}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="served">Served</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Box display="flex" flexDirection="column" gap={3} width="100%" maxWidth={800} alignItems="center">
        {!loading && filteredOrders.length === 0 && (
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 50, color: 'gray', mb: 2 }} />
              <Typography color="textSecondary">No orders found.</Typography>
            </CardContent>
          </Card>
        )}

        {filteredOrders.map(order => (
          <Card key={order.id} sx={{ border: '1px solid #ffeb3b', width: '100%' }}>
            <CardHeader title={`${order.customer} (#${order.id})`} subheader={`Phone: ${order.phone}`} />
            <CardContent>
              <List dense>
                {order.items.map((item, idx) => (
                  <ListItem key={idx}><ListItemText primary={item} /></ListItem>
                ))}
              </List>

              <Typography variant="body2" color="textSecondary">Total: ${order.total.toFixed(2)}</Typography>
              <Typography variant="body2" color="textSecondary">Status: {order.status}</Typography>
              <Typography variant="body2" color="textSecondary">Address: {order.address}</Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button variant="outlined" size="small" onClick={() => setStatus(order.id, 'pending')}>Mark Pending</Button>
                <Button variant="outlined" size="small" color="success" onClick={() => setStatus(order.id, 'delivered')}>Mark Delivered</Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
