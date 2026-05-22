import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormHeroInterface,
  formHeroValidation,
} from "../validations/form-hero.validation";

const useFormHeroController = () => {
  //Schema, types, values form hero
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormHeroInterface>({
    mode: "onChange",
    resolver: zodResolver(formHeroValidation),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone_number: "",
      phone_extension: "57",
    },
  });

  const onSubmit = async (formData: FormHeroInterface) => {
    try {
      console.log(formData);
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    errors,
    control,
    handleSubmit,
    onSubmit,
  };
};

export { useFormHeroController };
