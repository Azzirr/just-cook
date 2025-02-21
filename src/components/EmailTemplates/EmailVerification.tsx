interface EmailTemplateProps {
  username: string;
  confirmLink: string;
}

export const EmailVerification: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  confirmLink,
}) => (
  <div>
    <div>
      <h1>Welcome to Just-Cook, {username}!</h1>
      <p>
        Thank you for signing up. Please confirm your email address to activate
        your account.
      </p>
      <div>
        <a href={confirmLink} className="font-semibold text-white">
          Confirm Your Email
        </a>
      </div>
      <p>If you didn't create an account, you can safely ignore this email.</p>
      <p>— The Just-Cook Team</p>
    </div>
  </div>
);
