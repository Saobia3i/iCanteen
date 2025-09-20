@component('mail::message')
# New Contact Message

**From:** {{ $payload['name'] }} ({{ $payload['email'] }})  
**Subject:** {{ $payload['subject'] }}

---

{{ $payload['message'] }}

@endcomponent
