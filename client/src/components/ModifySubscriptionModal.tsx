import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
} from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { updateSubscription, deleteSubscription } from '../services/apiService';
import { useStore } from '../zustand/store';

export default function ModifySubscriptionModal({ subscription, notify }) {
  // ZUSTAND:
  const setDisplaySubscriptions = useStore(
    (state) => state.setDisplaySubscriptions,
  );
  const setAllSubscriptions = useStore((state) => state.setAllSubscriptions);
  // const allSubscriptions = useStore((state) => state.allSubscriptions);

  // STATES:
  const [modalData, setModalData] = useState(subscription);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  >('md');

  // FUNCTIONS:
  const handleOpen = (size: '3xl') => {
    setSize('3xl');
    onOpen();
  };

  async function handleClose() {
    onClose();
    const res = await updateSubscription(modalData._id, modalData);
    setAllSubscriptions(res);
    setDisplaySubscriptions(res);
    notify('modify');
  }

  async function handleDelete() {
    onClose();
    const res = await deleteSubscription(modalData._id);
    console.log('res delete: ', res);
    setAllSubscriptions(res);
    setDisplaySubscriptions(res);
    notify('delete');
  }

  // RENDER:
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button key={size} onPress={() => handleOpen(size)}>
          <PencilSquareIcon />
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(handleClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Subscription
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="name"
                    label="Subscription Service"
                    value={modalData.name}
                    onChange={(e) =>
                      setModalData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    type="cost"
                    label="Cost"
                    value={modalData.cost}
                    onChange={(e) =>
                      setModalData((prevData) => ({
                        ...prevData,
                        cost: e.target.value,
                      }))
                    }
                  />
                </div>
                <RadioGroup
                  label="Select a billing cycle:"
                  defaultValue={subscription.monthly.toString()}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      monthly: e.target.value,
                    }))
                  }
                >
                  <Radio value="true">Monthly</Radio>
                  <Radio value="false">Annual</Radio>
                </RadioGroup>
                <RadioGroup
                  label="Active status:"
                  defaultValue={subscription.active.toString()}
                  onChange={(e) =>
                    setModalData((prevData) => ({
                      ...prevData,
                      active: e.target.value,
                    }))
                  }
                >
                  <Radio value="true">Active</Radio>
                  <Radio value="false">Suspended</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleDelete}>
                  Delete
                </Button>
                <Button color="primary" onPress={handleClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
