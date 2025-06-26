"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
  CardAction,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { error } from "console";

const schema = z.object({
  email: z.string().email(),
  amount: z.number().min(100, "Minimum is 100").max(100000, "Max is 100000"),
});

type FormData = z.infer<typeof schema>;

export default function PayStackPayment() {

  const {
    register,
    handleSubmit,
      formState: { errors },
    reset, watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
    
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Paystack Payment Gateway</CardTitle>
          <CardDescription>Please make your payment here</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                required
                name="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                required
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-destructive">{errors.amount.message}</p>
              )}
            </div>
            <Button className="w-full" size="lg">
              Pay
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
