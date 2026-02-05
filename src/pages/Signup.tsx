import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Signup = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Password"/>

        <div className="flex justify-center pt-4">
          <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} />
        </div>
      </div>
      Signup
    </div>
  );
};
