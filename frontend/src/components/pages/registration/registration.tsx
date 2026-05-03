import type { FormEvent } from 'react';

import registerImage from 'assets/login-and-registration/budgetie-register.png';

import Button from 'ui/buttons/button';
import { ButtonVariant } from 'ui/buttons/enums/button-variant';
import Card from 'ui/cards/card';
import Input from 'ui/form-elements/input';

const Register = () => {
  const handleSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-10 md:items-center md:px-6">
      <section
        aria-labelledby="register-title"
        className="flex w-full max-w-md flex-col gap-6"
      >
        <div className="flex items-center gap-4 text-left">
          <img
            alt=""
            aria-hidden="true"
            className="h-20 w-20 shrink-0 object-contain md:h-24 md:w-24"
            src={registerImage}
          />

          <div className="flex flex-col gap-2">
            <h1
              className="text-storm-dust-950 dark:text-storm-dust-50 text-3xl font-bold"
              id="register-title"
            >
              Create an account
            </h1>

            <p className="text-storm-dust-600 dark:text-storm-dust-300 text-sm leading-6">
              Create your account with an email and password to start tracking
              your budget.
            </p>
          </div>
        </div>

        <Card>
          <form className="flex flex-col gap-5" onSubmit={handleSubmitRegister}>
            <Input
              autoComplete="email"
              id="register-email"
              label="Email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />

            <Input
              autoComplete="new-password"
              id="register-password"
              label="Password"
              name="password"
              required
              type="password"
            />

            <div className="flex justify-end">
              <Button
                additional_css="w-full md:w-auto"
                label="Create account"
                type="submit"
                variant={ButtonVariant.PRIMARY}
              />
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
};

export default Register;
