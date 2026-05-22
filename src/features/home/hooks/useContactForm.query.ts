import { useMutation } from "@tanstack/react-query";
import { postContactFormAction } from "../actions/post-contact-form";
import { ContactFormInterface } from "../validations/contact-form.validation";

const useContactFormMutation = () => {
  const usageMutation = useMutation({
    mutationFn: (body: ContactFormInterface) => postContactFormAction(body),
  });

  return usageMutation;
};

export { useContactFormMutation };
