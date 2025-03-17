import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AssistantAvatar() {
  return (
    <Avatar className="h-8 w-8 mt-0.5">
      <AvatarImage
        src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop&crop=faces&faceindex=1"
        alt="AI Assistant"
      />
      <AvatarFallback className="bg-green-100 text-green-700">AI</AvatarFallback>
    </Avatar>
  )
}

