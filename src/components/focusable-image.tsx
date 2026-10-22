"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function FocusableImage(props: ComponentProps<typeof Image>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef<string | null>(null);

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => () => restoreScroll(), []);

  function open() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
  }

  return <>
    <button type="button" className="image-focus-trigger" onClick={open} aria-label={`Enlarge ${props.alt}`} aria-haspopup="dialog">
      <Image {...props} />
    </button>
    <dialog ref={dialog} className="image-dialog" aria-label={props.alt} onClose={restoreScroll} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" className="image-dialog-close" onClick={() => dialog.current?.close()} aria-label="Close image" autoFocus><X size={23} /></button>
      <Image {...props} className="focused-image" sizes="100vw" preload={false} loading="eager" />
      <p className="image-dialog-caption">{props.alt}</p>
    </dialog>
  </>;
}
