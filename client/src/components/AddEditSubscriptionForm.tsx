import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Switch,
} from '@chakra-ui/react';
import { generateToastConfig } from '../utils/toastUtils';
import apiService from '../services/apiService';

import { Subscription } from '../utils/types';

// Initial form
const initialFormState: Subscription = {
  name: '',
  cost: 0,
  billingDate: new Date(Date.now()),
  endDate: new Date(Date.now()),
  isActive: true,
};

const AddEditSubscriptionForm = ({
  isOpen,
  onClose,
  subscription,
  refreshSubscriptions,
}: {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | undefined;
  refreshSubscriptions: () => void;
}) => {
  const [formData, setFormData] = useState<Subscription>(initialFormState);
  const toast = useToast();

  useEffect(() => {
    setFormData(
      subscription && isOpen
        ? {
            name: subscription!.name || '',
            cost: subscription!.cost || 0,
            billingDate: subscription!.billingDate || '',
            endDate: subscription!.endDate || '',
            isActive: subscription!.isActive,
          }
        : initialFormState
    );
  }, [subscription, isOpen]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const subscriptionData: Subscription = {
        ...formData,
        cost: Number(formData.cost),
      };

      const data: Subscription = subscription
        ? await apiService.updateSubscription(
            subscription._id as string,
            subscriptionData
          )
        : await apiService.addSubscription(subscriptionData);

      const options = generateToastConfig(
        subscription ? 'updateSuccess' : 'addSuccess',
        data
      );
      toast(options);
      onClose();
      refreshSubscriptions();
    } catch (error) {
      console.error('Error:', error);
      toast(generateToastConfig('error', error as Subscription));
    }
  };

  const handleDelete = async () => {
    if (!subscription || !subscription._id) return;

    try {
      await apiService.deleteSubscription(subscription._id);
      toast(generateToastConfig('deleteSuccess', subscription));
      onClose();
      refreshSubscriptions();
    } catch (error) {
      console.error('Error:', error);
      toast(generateToastConfig('error', error as Subscription));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {subscription ? 'Edit Subscription' : 'Add Subscription'}
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            {/* Form fields */}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Cost</FormLabel>
              <Input
                name="cost"
                type="number"
                value={formData.cost.toString()}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Billing Date</FormLabel>
              <Input
                name="billingDate"
                type="date"
                value={formData.billingDate.toString()}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4} display="flex" alignItems="center">
              <FormLabel htmlFor="isActive" mb="0">
                Suspend
              </FormLabel>
              <Switch
                id="isActive"
                name="isActive"
                isChecked={formData.isActive}
                onChange={handleChange}
                mx={2}
              />
              <FormLabel mb="0">Active</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {subscription && (
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddEditSubscriptionForm;
