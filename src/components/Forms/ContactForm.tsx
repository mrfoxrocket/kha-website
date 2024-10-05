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
import { Textarea } from "../ui/textarea";

const url = "https://kha.pockethost.io/";
const pb = new PocketBase(url);

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    inquiryType: z.enum(["Investor", "Owner", "General"], {
        errorMap: () => ({ message: "Please select the type of inquiry" }),
    }),
    message: z.string().default(""),
    agreedToTerms: z.literal<boolean>(true, {
        errorMap: () => ({ message: "Please agree to the terms and conditions" }),
    }),
});

// ACCESS_KEY = 76249e16-b4f7-4ce5-999d-ae1a31d16bef

const ContactForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { isSubmitting, errors, isSubmitSuccessful } = useFormState({ control: form.control });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await pb.collection("contactedUs").create(values);

            await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "76249e16-b4f7-4ce5-999d-ae1a31d16bef",
                    from_name: "Kiwi Home Assist Website",
                    subject: "Contact Form Submission",
                    botcheck: false,
                    ...values,
                }),
            });

            console.log("Success");

            form.reset();
        } catch (error) {
            console.log(error);
            if (error instanceof ClientResponseError && error.status === 400) {
                console.error("Validation error: ", error.data);
                form.setError("root.serverError", {
                    type: "400",
                    message: "Please ensure all required fields are filled in correctly",
                });
            } else {
                console.error("Unexpected error: ", error);
            }
        }
    };

    return (
        <Form {...form}>
            {!isSubmitSuccessful ? (
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 h-full w-full p-10 max-w-3xl mx-auto  "
                >
                    <div className="grid grid-flow-col gap-8 w-full">
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
                    <FormField
                        control={form.control}
                        name="inquiryType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Inquiry Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex gap-10"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Investor" />
                                            </FormControl>
                                            <FormLabel className="font-normal">{"Investor"}</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Owner" />
                                            </FormControl>
                                            <FormLabel className="font-normal">{"Owner"}</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="General" />
                                            </FormControl>
                                            <FormLabel className="font-normal">{"General"}</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="" className="resize-none" {...field} />
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
                        // disabled={isSubmitting || !isValid}
                        className="w-full text-2xl rounded-full font-semibold"
                        size={"lg"}
                        type="submit"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
                    </Button>
                </form>
            ) : (
                <p className="text-2xl text-center bold">
                    We have recived your message and will get back to shortly. Thank you!
                </p>
            )}
        </Form>
    );
};

export default ContactForm;
