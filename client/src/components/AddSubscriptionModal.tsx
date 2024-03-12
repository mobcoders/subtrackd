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
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { addSubscription } from '../services/apiService';
import { useStore } from '../zustand/store';

const formState = {
  name: '',
  cost: 0,
  billingDate: new Date(Date.now()).toISOString().slice(0, 10),
  active: true,
  monthly: true,
};

export default function AddSubscriptionModal() {
  // ZUSTAND:
  const setDisplaySubscriptions = useStore(
    (state) => state.setDisplaySubscriptions,
  );
  const setAllSubscriptions = useStore((state) => state.setAllSubscriptions);
  // const allSubscriptions = useStore((state) => state.allSubscriptions);

  // STATES:
  const [modalData, setModalData] = useState(formState);
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
    const res = await addSubscription(modalData);
    setAllSubscriptions(res);
    setDisplaySubscriptions(res);
  }

  // RENDER:
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button key={size} onPress={() => handleOpen(size)}>
          <PlusCircleIcon />
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          {(handleClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Subscription
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full gap-3">
                  <Input
                    isRequired
                    type="name"
                    label="Subscription"
                    variant="bordered"
                    placeholder="Add subscription here"
                    value={modalData.name}
                    onChange={(e) =>
                      setModalData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                  <Input
                    isRequired
                    type="cost"
                    label="Cost"
                    variant="bordered"
                    value={modalData.cost}
                    onChange={(e) =>
                      setModalData((prevData) => ({
                        ...prevData,
                        cost: e.target.value,
                      }))
                    }
                  />
                  <Input
                    isRequired
                    type="date"
                    label="First payment"
                    variant="bordered"
                    value={modalData.billingDate}
                    onChange={(e) =>
                      setModalData((prevData) => ({
                        ...prevData,
                        billingDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <RadioGroup
                    label="Select a billing cycle:"
                    defaultValue={modalData.monthly.toString()}
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
                    defaultValue={modalData.active.toString()}
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
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
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
