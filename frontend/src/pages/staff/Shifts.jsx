import React, { useState } from 'react';
import { Card, Avatar, Badge, Button, Select, Space, Typography, Row, Col } from 'antd';
import { ClockCircleOutlined, UserOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Shift() {
  const [selectedDay, setSelectedDay] = useState('today');

  // Mock shift data
  const shifts = [
    { id: 1, staffName: 'John Smith', role: 'Chef', shift: 'Morning', time: '6:00 AM - 2:00 PM', status: 'Active', location: 'Kitchen', avatar: '', phone: '+1 (555) 123-4567' },
    { id: 2, staffName: 'Sarah Johnson', role: 'Server', shift: 'Morning', time: '7:00 AM - 3:00 PM', status: 'Active', location: 'Front Counter', avatar: '', phone: '+1 (555) 234-5678' },
    { id: 3, staffName: 'Mike Davis', role: 'Delivery', shift: 'Afternoon', time: '2:00 PM - 10:00 PM', status: 'Scheduled', location: 'Delivery Zone A', avatar: '', phone: '+1 (555) 345-6789' },
    { id: 4, staffName: 'Emily Wilson', role: 'Manager', shift: 'All Day', time: '8:00 AM - 6:00 PM', status: 'Active', location: 'Office', avatar: '', phone: '+1 (555) 456-7890' },
    { id: 5, staffName: 'Alex Brown', role: 'Chef', shift: 'Evening', time: '2:00 PM - 10:00 PM', status: 'Scheduled', location: 'Kitchen', avatar: '', phone: '+1 (555) 567-8901' },
    { id: 6, staffName: 'Lisa Garcia', role: 'Server', shift: 'Evening', time: '3:00 PM - 11:00 PM', status: 'Scheduled', location: 'Front Counter', avatar: '', phone: '+1 (555) 678-9012' },
    { id: 7, staffName: 'Tom Anderson', role: 'Delivery', shift: 'Morning', time: '7:00 AM - 3:00 PM', status: 'Break', location: 'Delivery Zone B', avatar: '', phone: '+1 (555) 789-0123' },
    { id: 8, staffName: 'Rachel Lee', role: 'Cashier', shift: 'Afternoon', time: '12:00 PM - 8:00 PM', status: 'Active', location: 'Register 1', avatar: '', phone: '+1 (555) 890-1234' },
  ];

  // Group shifts by shift time
  const groupedShifts = {
    Morning: shifts.filter(s => s.shift === 'Morning'),
    Afternoon: shifts.filter(s => s.shift === 'Afternoon'),
    Evening: shifts.filter(s => s.shift === 'Evening'),
    'All Day': shifts.filter(s => s.shift === 'All Day'),
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Scheduled': return 'blue';
      case 'Break': return 'orange';
      case 'Off': return 'gray';
      default: return 'gray';
    }
  };

  const activeStaff = shifts.filter(s => s.status === 'Active').length;
  const totalStaff = shifts.length;
  const onBreak = shifts.filter(s => s.status === 'Break').length;

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      {/* Header */}
      <Card style={{ marginBottom: '24px', background: 'linear-gradient(to right, #FACC15, #F59E0B)', border: '2px solid #D97706' }}>
        <Title level={3} style={{ color: '#000' }}>🕒 Shift Management</Title>
        <Text style={{ color: '#000000cc', fontSize: '16px' }}>View and manage all staff shifts and assignments</Text>
      </Card>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space align="center">
              <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#3B82F6' }} />
              <div>
                <Text type="secondary">Total Staff</Text>
                <br />
                <Text strong>{totalStaff}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space align="center">
              <Avatar size="large" icon={<ClockCircleOutlined />} style={{ backgroundColor: '#10B981' }} />
              <div>
                <Text type="secondary">Active Now</Text>
                <br />
                <Text strong>{activeStaff}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space align="center">
              <Avatar size="large" icon={<ClockCircleOutlined />} style={{ backgroundColor: '#F59E0B' }} />
              <div>
                <Text type="secondary">On Break</Text>
                <br />
                <Text strong>{onBreak}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space align="center">
              <Avatar size="large" icon={<CalendarOutlined />} style={{ backgroundColor: '#8B5CF6' }} />
              <div>
                <Text type="secondary">Shifts Today</Text>
                <br />
                <Text strong>{shifts.length}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Day Filter */}
      <Card style={{ marginBottom: '24px' }}>
        <Space>
          <CalendarOutlined />
          <Select value={selectedDay} onChange={setSelectedDay} style={{ width: 180 }}>
            <Option value="today">Today</Option>
            <Option value="tomorrow">Tomorrow</Option>
            <Option value="this-week">This Week</Option>
          </Select>
        </Space>
      </Card>

      {/* Shifts */}
      {Object.entries(groupedShifts).map(([shiftTime, staffList]) => (
        staffList.length > 0 && (
          <Card key={shiftTime} title={`${shiftTime} Shift`} extra={<Badge count={staffList.length} style={{ backgroundColor: '#FACC15' }} />} style={{ marginBottom: '24px' }}>
            <Row gutter={[16, 16]}>
              {staffList.map(staff => (
                <Col xs={24} sm={12} md={8} key={staff.id}>
                  <Card bordered hoverable>
                    <Space align="start">
                      <Avatar size="large" style={{ backgroundColor: '#FBBF24' }}>
                        {staff.staffName.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <div>
                        <Text strong>{staff.staffName}</Text>
                        <br />
                        <Text type="secondary">{staff.role}</Text>
                        <br />
                        <Badge color={getStatusColor(staff.status)} text={staff.status} />
                        <div style={{ marginTop: 8, padding: 8, backgroundColor: '#FEF3C7', borderRadius: 4 }}>
                          <ClockCircleOutlined /> <Text>{staff.time}</Text>
                          <br />
                          <EnvironmentOutlined /> <Text>{staff.location}</Text>
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>{staff.phone}</Text>
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )
      ))}

      {/* Quick Actions */}
      <Card>
        <Title level={4}>Quick Actions</Title>
        <Space wrap>
          <Button icon={<ClockCircleOutlined />}>Add Shift</Button>
          <Button icon={<UserOutlined />}>View All Staff</Button>
          <Button icon={<CalendarOutlined />}>Weekly Schedule</Button>
        </Space>
      </Card>
    </div>
  );
}
