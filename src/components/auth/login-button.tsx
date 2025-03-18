import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { signInWithGithub } from '@/app/actions';

export const LoginButton = () => {
  return (
    <div className='flex flex-col gap-6'>
      <Card className='min-w-96'>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className='w-full' onClick={signInWithGithub}>
            Login with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
