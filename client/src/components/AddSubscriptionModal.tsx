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
import { Subscription } from '../utils/types';

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

  // FUNCTIONS:
  const handleOpen = () => {
    onOpen();
  };

  async function handleSubmit() {
    onClose();
    const res = await addSubscription(modalData);
    setAllSubscriptions(res);
    setDisplaySubscriptions(res);
    setModalData(formState);
  }

  function handleClose() {
    onClose();
    setModalData(formState);
  }

  // RENDER:
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onPress={() => handleOpen()}>
          <PlusCircleIcon />
        </Button>
      </div>
      <Modal size={'3xl'} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
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
                  value={modalData.cost.toString()}
                  onChange={(e) =>
                    setModalData((prevData: Subscription) => ({
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
                    setModalData((prevData: Subscription) => ({
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
                    setModalData((prevData: Subscription) => ({
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
              <Button color="primary" onPress={handleSubmit}>
                Add Subscription
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
