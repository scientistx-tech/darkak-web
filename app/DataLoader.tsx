'use client';
import { useGetUserQuery } from '@/redux/services/authApis';
import { updateUser } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSocket from './hooks/useSocket';
import { toast } from 'react-toastify';
import { getFCMToken } from '@/utils/firebase';
import { socket } from '@/socket';
import FirebaseNotifications from '@/components/FirebaseNotifications';

function DataLoader({ children }: { children: React.ReactNode }) {
  const { currentData, isLoading } = useGetUserQuery();
  const dispatch = useDispatch<AppDispatch>();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');

  useEffect(() => {
    if (currentData) {
      dispatch(updateUser(currentData));
    }
  }, [dispatch, currentData]);
  //console.log(isConnected, transport);

  useEffect(() => {
    if (!currentData) return;
    let isMounted = true;

    const connectSocket = async () => {
      try {
        const token = await getFCMToken(); // get your Firebase token
        const userId = currentData.id;

        if (token && isMounted) {
          // Connect and send token
          socket.connect();
          socket.emit('user_connected', userId, token);
        }
      } catch (err) {
        console.error('Failed to connect with FCM token:', err);
      }
    };

    connectSocket();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('error', (err: { message: string }) => {
      toast.warning(err?.message || 'An error occurred while connecting to the socket.');
    });

    return () => {
      isMounted = false;
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('error');
    };
  }, [currentData]);

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white bg-opacity-80 backdrop-blur-sm">
  //       <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
  //       <p className="font-medium text-blue-500">Getting ready..!</p>
  //     </div>
  //   );
  // }
  //console.log(data)
  return (
    <div>
      <FirebaseNotifications />
      {children}
    </div>
  );
}

export default DataLoader;
