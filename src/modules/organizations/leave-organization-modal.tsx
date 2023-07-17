import { Button, ButtonGroup, Text, useToast } from "@chakra-ui/react";
import { Modal } from "../../components/modal";
import { useOrganization } from "../../hooks/use-organization";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";
import { AnimatedCheckCircle } from "../../components/animated-icons/check";
import { useRouter } from "next/router";

export interface RemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveOrganizationModal: React.FC<RemoveMemberModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useToast();

  const org = useOrganization();
  const removeMember = api.organizations.removeMember.useMutation({
    onSuccess: async () => {
      await router.push("/orgs");
      toast({
        title: "Left organization",
        icon: <AnimatedCheckCircle />,
        containerStyle: { marginBottom: "2rem", marginTop: "-1rem" },
      });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Body spacing="2">
          <Modal.Heading>Leave organization</Modal.Heading>
          <Text>Are you sure you want to leave this organization?</Text>
        </Modal.Body>
        <Modal.Divider />
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={removeMember.isLoading}
              onClick={() =>
                removeMember.mutate({
                  orgId: org!.id,
                  userId: session!.user!.id,
                })
              }
            >
              Leave
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};