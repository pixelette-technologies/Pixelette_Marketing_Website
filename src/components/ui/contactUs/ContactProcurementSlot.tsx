import { Container } from "@/components/common";
import { contactProcurementSlot } from "@/data/contactUs";

// 12 Nov brief §5 — visible empty slot for the Plan §9.3 procurement
// replacement. No invented heading or body until that copy is in the repo.
export default function ContactProcurementSlot() {
  return (
    <section
      className='contactProcurement'
      aria-label='Procurement replacement pending'
    >
      <Container className='main'>
        <div className='contactProcurement__slot'>
          {contactProcurementSlot.heading ? (
            <h2 className='h3'>{contactProcurementSlot.heading}</h2>
          ) : null}
          {contactProcurementSlot.body ? (
            <p className='body'>{contactProcurementSlot.body}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
