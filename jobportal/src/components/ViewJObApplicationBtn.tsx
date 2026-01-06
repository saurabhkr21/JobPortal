import { Button, Dialog, Spinner, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

type Applicant = {
  id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
  resumeUrl?: string;
};

export default function ViewJobApplicationBtn({
  job,
}: {
  job: { id: string };
}) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getApplications() {
      setLoading(true);
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/^['"]+|['";]+$/g, "");
      const res = await fetch(`${baseUrl}/api/applicants/${job.id}`);
      const data = await res.json();
      if (data?.success) {
        setApplicants(data?.data);
      }
      setLoading(false);
    }
    getApplications();
  }, [job.id]);

  async function handleDeleteApplication(id: string) {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/^['"]+|['";]+$/g, "");
      const res = await fetch(`${baseUrl}/api/application/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setApplicants((prev) => prev.filter((app) => app.id !== id));
        alert("Application deleted successfully");
      } else {
        alert(data.message || "Failed to delete application");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View Job</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Job Applicants</Dialog.Title>

        {loading && (
          <p>
            <Spinner />
          </p>
        )}

        <div>
          {applicants.length === 0 && !loading && (
            <p className="text-gray-500">No applicants found.</p>
          )}
          {applicants.map((application) => (
            <div
              key={application.id || application.user?.id}
              className="border-b py-2 flex items-center justify-between"
            >
              <div>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {application.user?.name || "Unknown"}
                </p>
                {application.user?.email && (
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {application.user.email}
                  </p>
                )}
                {application.resumeUrl && (
                  <p>
                    <span className="font-semibold">Resume:</span>{" "}
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </div>
              {application.id && (
                <button
                  onClick={() => handleDeleteApplication(application.id!)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Application"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
