import { Button, Dialog, Flex, Text, TextField, Spinner } from "@radix-ui/themes";
import { SendIcon, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function JobApplyBtn({
    job,
    isApplied = false,
}: {
    job: { id: string };
    isApplied?: boolean;
}) {
    const [resumeUrl, setResumeUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleApply() {
        if (!resumeUrl) {
            alert("Please enter a resume URL");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/job/apply/${job?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resumeUrl }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Application submitted successfully!");
                setOpen(false);
                setResumeUrl("");
                window.location.reload(); // Refresh to show applied state
            } else {
                alert(
                    data.data?.message || "Something went wrong, please try again later"
                );
            }
        } catch (err) {
            console.error("Error applying for job:", err);
            alert("Failed to submit application. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isApplied) {
        return (
            <button
                disabled
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed opacity-90"
            >
                <CheckCircle size={16} /> Applied
            </button>
        );
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <SendIcon size={16} /> Apply Now
                </button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Apply for Job</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Please provide a link to your resume/portfolio.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Resume/Portfolio URL
                        </Text>
                        <TextField.Root
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                            placeholder="https://drive.google.com/..."
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button onClick={handleApply} disabled={loading}>
                        {loading ? <Spinner /> : "Submit Application"}
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

