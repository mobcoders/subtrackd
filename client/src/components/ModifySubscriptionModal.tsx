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
  modal,
} from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { updateSubscription } from '../services/apiService';

export default function ModifySubscriptionModal({
  subscription,
  setSubscriptions,
  applySortAndFilter,
}) {
  const [modalData, setModalData] = useState(subscription);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  >('md');

  const handleOpen = (size: '3xl') => {
    setSize('3xl');
    onOpen();
  };

  const handleClose = () => {
    onClose();
    findOneAndUpdate(modalData);

    setSubscriptions((prevData) => {
      const indexOfSub = prevData
        .map((obj) => obj._id)
        .indexOf(subscription._id);

      console.log('indexOfSub', indexOfSub);
      return [...prevData].splice(indexOfSub, 1, modalData);
    });

    console.log('modalData: \n', modalData);
  };

  function findOneAndUpdate(modifiedSub) {
    try {
      updateSubscription(modifiedSub._id, modifiedSub);
    } catch (error) {
      console.error('Error modifying subscription: \n', error);
    }
  }

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
