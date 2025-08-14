'use client'
import JobListings from "@/components/JobListing";
import NonCompanyHomePage from "@/components/NonCompanyHome";
import { useSelector } from "react-redux";

export default function Home() {
  const { Company } = useSelector((state: any) => state.Company);
  const { User } = useSelector((state: any) => state.User);

  if (User?.role == 'company' && !Company) {
    return (
      <NonCompanyHomePage />
    )
  }
  return (
    <div className="">
      <JobListings />

    </div>
  );
}
