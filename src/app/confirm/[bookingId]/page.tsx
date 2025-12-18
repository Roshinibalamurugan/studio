
// We will make the parent a client component to handle user auth state.
import ConfirmationClientPage from './client-page';

type ConfirmationPageProps = {
  params: {
    bookingId: string;
  };
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  return <ConfirmationClientPage bookingId={params.bookingId} />;
}
