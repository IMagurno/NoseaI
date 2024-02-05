export default function LandingPage() {
  return (
    <div className="flex flex-col gap-3 max-w-[512px] justify-center items-center">
      <a className="text-xl text-blue-600 hover:underline" href="/rooms">
        Rooms
      </a>
      <a className="text-xl text-blue-600 hover:underline" href="/homepage">
        Homepage
      </a>
    </div>
  );
}
