import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/app/lib/data";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Invoice",
};

// Page component for editing an invoice with the provided ID.
export default async function Page(props: {params: Promise<{ id: string }>}) {
  const params = await props.params; // Get the ID parameter from the props
  const id = params.id; // Extract the ID from the props
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]); // Fetch the invoice and customers data

  if(!invoice) {
    notFound(); // If the invoice is not found, return a 404 page
  }
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
