import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Signin = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="min-w-48 rounded-xl border bg-white p-8">
        <Input placeholder="Username" />
        <Input placeholder="password" />

        <div className="flex items-center justify-center pt-4">
          <Button variant="primary" fullWidth={true} loading={false}>
            Signin
          </Button>
        </div>
      </div>
    </div>
  );
};
