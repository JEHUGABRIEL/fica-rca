import { site } from "@/lib/site";

type PropsIcone = React.SVGProps<SVGSVGElement>;

export function IconeFacebook(props: PropsIcone) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function IconeLinkedin(props: PropsIcone) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.9 8.5H3.6V20h3.3V8.5ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.4c0-3.1-1.7-5.1-4.4-5.1-1.5 0-2.5.8-2.9 1.6V8.5H9.9V20h3.3v-6c0-1.6.7-2.6 2-2.6s1.9 1 1.9 2.6v6h3.3v-6.6Z" />
    </svg>
  );
}

export function IconeWhatsapp(props: PropsIcone) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

const reseaux = [
  { nom: "Facebook", href: site.reseaux.facebook, Icone: IconeFacebook },
  { nom: "LinkedIn", href: site.reseaux.linkedin, Icone: IconeLinkedin },
  { nom: "WhatsApp", href: site.whatsappLien, Icone: IconeWhatsapp },
];

/* Liens vers les réseaux de la FICA. Seuls les comptes vérifiés sont listés
   (Instagram, YouTube et X étaient vides sur l'ancien site). */
export function IconesSociales({ clair = false, className = "" }: { clair?: boolean; className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {reseaux.map(({ nom, href, Icone }) => (
        <li key={nom}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`FICA sur ${nom}`}
            title={nom}
            className={`grid size-9 place-items-center border transition-colors ${
              clair
                ? "border-white/25 text-white/80 hover:border-white hover:bg-white hover:text-marine"
                : "border-filet text-marine hover:border-bleu hover:bg-bleu hover:text-white"
            }`}
          >
            <Icone className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
