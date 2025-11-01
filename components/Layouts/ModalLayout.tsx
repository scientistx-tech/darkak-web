import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles.css";
import { IoMdClose } from "react-icons/io";
import Button from "../FormElements/Button";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    title?: string;
    description?: string;
    onChange: () => void;
    modalComponent?: React.ReactNode;
    isAction?: boolean;
    onAction?: () => void;
    actionTitle?: string;
}
const ModalLayout: React.FC<Props> = ({
    children,
    isOpen,
    description,
    title,
    onChange,
    modalComponent,
    isAction,
    onAction,
    actionTitle,
}) => (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
        {children}
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent overflow-y-scroll">
                <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                    {description}
                </Dialog.Description>
                {modalComponent}
                {isAction && (
                    <Dialog.Close asChild>
                        <Button onClick={onAction} className="Button">
                            {actionTitle ? actionTitle : "Save changes"}
                        </Button>
                    </Dialog.Close>
                )}
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <IoMdClose />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default ModalLayout;