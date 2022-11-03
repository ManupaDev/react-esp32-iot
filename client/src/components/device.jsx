function Device({ name,id }) {
  return (
    <div className="rounded-lg  border border-black p-2" id={id}>
      <h1 className="text-xl">{name}</h1>
      <h1 className="mt-2 text-4xl font-bold">OFF</h1>
    </div>
  );
}

export default Device;
