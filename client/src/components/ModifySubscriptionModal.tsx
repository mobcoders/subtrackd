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
import { Subscription } from '../utils/types';

export default function ModifySubscriptionModal({
  subscription,
  notify,
}: {
  subscription: Subscription;
}) {
  // ZUSTAND:
  const setDisplaySubscriptions = useStore(
    (state) => state.setDisplaySubscriptions,
  );
  const setAllSubscriptions = useStore((state) => state.setAllSubscriptions);

  // STATES:
  const [modalData, setModalData] = useState(subscription);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // FUNCTIONS:
  const handleOpen = () => {
    onOpen();
  };

  async function handleSubmit() {
    onClose();
    const res = await updateSubscription(subscription._id as string, modalData);
    setAllSubscriptions(res);
    setDisplaySubscriptions(res);
    notify('modify');
  }

  function handleClose() {
    onClose();
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
      <div>
        <Button
          isIconOnly
          className="bg-transparent"
          onPress={() => handleOpen()}
        >
          <PencilSquareIcon className="stroke-1 stroke-white" />
        </Button>
      </div>
      <Modal size={'3xl'} isOpen={isOpen} onClose={handleClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit Subscription
          </ModalHeader>
          <ModalBody>
            <div className="flex w-full gap-3">
              <Input
                isRequired
                type="name"
                label="Subscription"
                variant="bordered"
                value={modalData.name}
                onChange={(e) =>
                  setModalData((prevData: Subscription) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                type="cost"
                label="Cost"
                variant="bordered"
                value={modalData.cost}
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
                value={modalData.billingDate as string}
                onChange={(e) =>
                  setModalData((prevData: Subscription) => ({
                    ...prevData,
                    billingDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <RadioGroup
                label="Select a billing cycle:"
                defaultValue={subscription.monthly.toString()}
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
                defaultValue={subscription.active.toString()}
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
            <Button color="danger" variant="light" onPress={handleDelete}>
              Delete
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
