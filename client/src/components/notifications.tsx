import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../services/api-service';
import { Notification } from '../utils/types';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';

export default function Notifications() {
  // STATES:
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // USE EFFECTS:
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifications = await fetchNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  // RENDER:
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button isIconOnly className="bg-transparent">
          <BellAlertIcon className="cursor-pointer stroke-1 stroke-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="px-1 py-2">
              <div className="text-small font-bold">{notification.message}</div>
              <div className="text-tiny">is due tomorrow</div>
            </div>
          ))
        ) : (
          <div className="px-1 py-2">
            <div className="text-small font-bold">No notifications</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}