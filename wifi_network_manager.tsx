import React, { useState, useMemo } from 'react';
import { Wifi, Plus, Search, Trash2, X, WifiOff, Signal } from 'lucide-react';

const WifiNetworkManager = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'RYAN', device: 'Samsung S20 ULTRA', mac: '26:ca:c9:61:46:d8', ip: '192.168.100.2', status: 'online' },
    { id: 2, name: 'JAZTINE', device: 'IPHONE 11 PRO', mac: '6e:9e:30:0c:e7:15', ip: '192.168.100.3', status: 'online' },
    { id: 3, name: 'JAJA', device: 'Samsung S22 Ultra', mac: '1e:c8:c3:5d:b0:10', ip: '192.168.100.4', status: 'online' },
    { id: 4, name: 'LOLA', device: 'OPPO-A57', mac: '4a:8b:48:1e:43:35', ip: '192.168.100.5', status: 'online' },
    { id: 5, name: 'TITA', device: 'OPPO-A5s', mac: 'd8:1e:dd:98:20:39', ip: '192.168.100.6', status: 'online' },
    { id: 6, name: 'PATS', device: 'POCO-X3-NFC', mac: '2e:70:3d:e8:98:f8', ip: '192.168.100.7', status: 'online' },
    { id: 7, name: 'CHARLES', device: 'Galaxy-Tab-A7-Li', mac: '46:a0:32:66:67:2e', ip: '192.168.100.10', status: 'online' },
    { id: 8, name: 'ASENG', device: 'HONOR-X9a-5G', mac: '12:5b:8b:29:72:5f', ip: '192.168.100.9', status: 'online' },
    { id: 9, name: 'RYAN', device: 'Ryan-s-S23-Ultra', mac: 'e6:93:b9:5e:43:1f', ip: '192.168.100.11', status: 'online' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: '', device: '', mac: '', ip: '' });

  const filteredDevices = useMemo(() => {
    if (!searchQuery.trim()) return devices;
    const query = searchQuery.toLowerCase();
    return devices.filter(device => 
      device.name.toLowerCase().includes(query) ||
      device.device.toLowerCase().includes(query) ||
      device.mac.toLowerCase().includes(query) ||
      device.ip.toLowerCase().includes(query)
    );
  }, [devices, searchQuery]);

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.device || !newDevice.mac || !newDevice.ip) {
      alert('Please fill all fields');
      return;
    }
    const newId = Math.max(...devices.map(d => d.id), 0) + 1;
    setDevices([...devices, { ...newDevice, id: newId, status: 'online' }]);
    setNewDevice({ name: '', device: '', mac: '', ip: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Remove this device?')) {
      setDevices(devices.filter(d => d.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, status: d.status === 'online' ? 'offline' : 'online' } : d
    ));
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Signal className="text-blue-400" size={32} />
              <h1 className="text-3xl md:text-4xl font-bold text-white">WiFi Manager</h1>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">ADMIN_00110011</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">Admin_Jaz</span>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus size={20} />
            <span className="hidden md:inline">Add</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search devices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-gray-400 text-sm mb-1">Total Devices</div>
            <div className="text-2xl font-bold text-white">{devices.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="text-gray-400 text-sm mb-1">Online</div>
            <div className="text-2xl font-bold text-green-400">
              {devices.filter(d => d.status === 'online').length}
            </div>
          </div>
        </div>

        {/* Device List */}
        <div className="space-y-3">
          {filteredDevices.map((device) => (
            <div key={device.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => toggleStatus(device.id)}
                    className="flex-shrink-0"
                  >
                    {device.status === 'online' ? (
                      <Wifi className="text-green-400" size={24} />
                    ) : (
                      <WifiOff className="text-gray-500" size={24} />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg truncate">{device.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        device.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2 truncate">{device.device}</div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-gray-500">
                        MAC: <span className="text-gray-300 font-mono">{device.mac}</span>
                      </span>
                      <span className="text-gray-500">
                        IP: <span className="text-gray-300 font-mono">{device.ip}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(device.id)}
                  className="flex-shrink-0 ml-2 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
            <WifiOff size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No devices found</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg max-w-md w-full p-6 border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Add Device</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-700 rounded">
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="User Name"
                value={newDevice.name}
                onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Device Model"
                value={newDevice.device}
                onChange={(e) => setNewDevice({ ...newDevice, device: e.target.value })}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="MAC Address"
                value={newDevice.mac}
                onChange={(e) => setNewDevice({ ...newDevice, mac: e.target.value })}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none font-mono"
              />
              <input
                type="text"
                placeholder="IP Address"
                value={newDevice.ip}
                onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
                className="w-full bg-slate-900 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none font-mono"
              />
            </div>

            <button
              onClick={handleAddDevice}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Add Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WifiNetworkManager;