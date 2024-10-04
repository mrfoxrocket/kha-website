import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import PocketBase, { ClientResponseError } from "pocketbase";

const url = "https://kha.pockethost.io/";
const pb = new PocketBase(url);

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    country: z.string(),
    investmentSize: z.enum(["<10k", "<100k", ">100k"], {
        errorMap: () => ({ message: "Select an investment size" }),
    }),
    // eligibleInvestor: z.boolean().optional(),
    eligibleInvestor: z.literal<boolean>(true, {
        errorMap: () => ({ message: "Please confirm that you are an eligible investor" }),
    }),
    agreedToTerms: z.literal<boolean>(true, {
        errorMap: () => ({ message: "Please agree to the terms and conditions" }),
    }),
});

const InvestorForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { isSubmitting, errors } = useFormState({ control: form.control });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await pb.collection("users").create(values);
            console.log("Success");
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
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country of Residence</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="investmentSize"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Investment Size</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-10"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="<10k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"< 10k"}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="<100k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"< 100k"}</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value=">100k" />
                                        </FormControl>
                                        <FormLabel className="font-normal">{"> 100k"}</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="eligibleInvestor"
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
                                <FormLabel>I am an eligible investor</FormLabel>
                                <FormDescription>
                                    By checking this box, you confirm that you qualify as an eligible investor based on{" "}
                                    <a href="/eligibility" className="text-primary hover:underline">
                                        these guidelines
                                    </a>
                                    . While formal certification is not required at this stage, you acknowledge that
                                    such a certification may be needed later in accordance with legal requirements. This
                                    step helps ensure compliance and allows us to tailor our communication to those who
                                    meet eligibility criteria.
                                </FormDescription>
                                <FormMessage />
                            </div>
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
                    disabled={isSubmitting}
                    className="w-full text-2xl rounded-full font-semibold"
                    size={"lg"}
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default InvestorForm;
