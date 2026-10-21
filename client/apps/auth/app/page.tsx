import Image from 'next/image';

export default function AuthHome() {
  return (
    <main>
      <Image
        className="auth-logo"
        src="/brand/full-primary.svg"
        alt="Bayes Institute"
        width={1483}
        height={505}
        priority
      />
      <h1>Account access is being prepared.</h1>
      <p>
        This application is the future home of single sign-on for every Bayes platform. Connect an
        identity provider here before building product-specific login flows.
      </p>
    </main>
  );
}
