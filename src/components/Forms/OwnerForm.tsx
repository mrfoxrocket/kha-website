import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

import PocketBase, { ClientResponseError } from "pocketbase";
import { Loader2 } from "lucide-react";

const url = "https://kha.pockethost.io/";
const pb = new PocketBase(url);

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    city: z.string(),
    suburb: z.string(),
    fundingSize: z.enum(["<100k", "100-300k", ">300k"], {
        errorMap: () => ({ message: "Please select the amount of funding you are looking to recieve" }),
    }),
    agreedToTerms: z.literal<boolean>(true, {
        errorMap: () => ({ message: "Please agree to the terms and conditions" }),
    }),
});

const OwnerForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { isSubmitting, errors, isValid } = useFormState({ control: form.control });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await pb.collection("owners").create(values);
            const emailResponse = await fetch("/api/email.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to: ["lukka.popov@proton.me"],
                    subject: "Test Email",
                    html: "<p>it works!</p>",
                }),
            });

            if (emailResponse.status === 500) {
                throw new Error(emailResponse.statusText);
            }

            console.log("Success");
            window.location.href = "/register/success";

            form.reset();
        } catch (error) {
            console.log(error);
            if (error instanceof ClientResponseError && error.status === 400) {
                console.error("Validation error: ", error.data);
                form.setError("root.serverError", {
                    type: "400",
                    message: "Please ensure all required fields are filled in correctly",
                });
            } else if (error instanceof Error && error.message.includes("Internal Server Error")) {
                form.setError("root.serverError", {
                    type: "500",
                    message: "Internal Server Error. Please contact support.",
                });
            } else if (error instanceof Error && error.message.includes("There was an error sending the email")) {
                form.setError("root.serverError", {
                    type: "500",
                    message: "There was an error sending the email. Please try again or contact support.",
                });
            } else {
                console.error("Unexpected error: ", error);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full w-full p-10">
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                    <p className="text-sm text-muted-foreground col-span-2">
                        Location of the property you would like to equity release
                    </p>
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="suburb"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Suburb</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="fundingSize"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Equity Release Amount (50k minimum)</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-10"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="<100k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"<100k"}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="100-300k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"100-300k"}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value=">300k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{">300k"}</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0 ">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                        console.log("Checkbox value:", checked);
                                        field.onChange(checked); // Update form state
                                    }}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Accept terms and conditions</FormLabel>
                                <FormDescription>
                                    By submitting this application, you agree to our{" "}
                                    <a href="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <p className="text-sm font-medium text-destructive min-h-[1.25rem]">
                    {errors.root?.serverError.message ? errors.root?.serverError.message : ""}
                </p>
                <Button
                    disabled={isSubmitting || !isValid}
                    className="w-full text-2xl rounded-full font-semibold"
                    size={"lg"}
                    type="submit"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default OwnerForm;
