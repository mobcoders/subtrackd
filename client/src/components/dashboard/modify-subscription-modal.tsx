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
import { PencilIcon } from '@heroicons/react/24/outline';
import {
  updateSubscription,
  deleteSubscription,
} from '../../services/api-service';
import { useStore } from '../../zustand/store';
import { Subscription } from '../../utils/types';
import { useAuth } from '@clerk/clerk-react';

export default function ModifySubscriptionModal({
  subscription,
  notify,
}: {
  subscription: Subscription;
  notify: (type: string) => void;
}) {
  // ZUSTAND:
  const setAllSubscriptions = useStore((state) => state.setAllSubscriptions);

  // STATES:
  const [modalData, setModalData] = useState(subscription);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToken, userId } = useAuth();

  // FUNCTIONS:
  const handleOpen = () => {
    onOpen();
  };

  async function handleSubmit() {
    onClose();
    const token = await getToken();
    const res = await updateSubscription(
      subscription._id as string,
      userId!,
      modalData,
      token!,
    );
    setAllSubscriptions(res as Subscription[]);
    notify('modify');
  }

  function handleClose() {
    onClose();
  }

  async function handleDelete() {
    onClose();
    const token = await getToken();
    const res = await deleteSubscription(
      modalData._id as string,
      userId!,
      token!,
    );
    setAllSubscriptions(res as Subscription[]);
    notify('delete');
  }

  // RENDER:
  return (
    <>
      <div className="flex flex-col justify-center">
        <Button
          isIconOnly
          className="bg-transparent"
          onPress={() => handleOpen()}
        >
          <PencilIcon
            className="stroke-1 stroke-white hover:scale-[1.1]"
            width={25}
          />
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
                value={modalData.cost.toString()}
                onChange={(e) =>
                  setModalData((prevData) => ({
                    ...prevData,
                    cost: eval(e.target.value),
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
                  setModalData((prevData) => ({
                    ...prevData,
                    monthly: eval(e.target.value),
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
                    active: eval(e.target.value),
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
