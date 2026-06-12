import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  message: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export function WhatsAppLink({
  message,
  children,
  className,
  ariaLabel = "Chat on WhatsApp",
  onClick,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
