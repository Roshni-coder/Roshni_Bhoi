// components/BulkCartItems.jsx

import { IoTrashOutline } from "react-icons/io5";

function BulkCartItems({
  item,
  onRemove,
  onUpdateQuantity
}) {

  const handleChange = (value) => {

    // allow empty while typing
    if (value === "") {
      onUpdateQuantity(item.productId, "");
      return;
    }

    const qty = Number(value);

    if (isNaN(qty)) return;

    onUpdateQuantity(item.productId, qty);

  };


  return (

    <div className="group flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-[2rem] border border-[#EDE3D2]">

      {/* Image */}
      <div className="w-32 h-32 bg-[#F9F6F0] rounded-2xl overflow-hidden border border-[#EDE3D2]">

        <img
          src={item.image}
          alt={item.productName}
          className="w-full h-full object-cover"
        />

      </div>


      {/* Details */}
      <div className="flex-1 w-full">

        <div className="flex justify-between">

          <h3 className="font-serif text-lg font-bold text-[#322619]">

            {item.productName}

          </h3>


          <button
            onClick={() => onRemove(item.productId)}
            className="text-red-500"
          >
            <IoTrashOutline size={22} />
          </button>

        </div>


        {/* Quantity */}
        <div className="flex items-center justify-between mt-4">

          <div className="flex items-center bg-[#F9F6F0] border border-[#EDE3D2] p-1 rounded-full">

            {/* Minus */}
            <button
              onClick={() =>
                onUpdateQuantity(
                  item.productId,
                  item.quantity - 1
                )
              }
              className="w-9 h-9 bg-white rounded-full"
            >
              −
            </button>


            {/* Input */}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleChange(e.target.value)
              }
              onBlur={(e) => {

                if (
                  e.target.value === "" ||
                  Number(e.target.value) < 1
                ) {
                  onUpdateQuantity(item.productId, 1);
                }

              }}
              className="w-16 text-center bg-transparent outline-none font-bold"
            />


            {/* Plus */}
            <button
              onClick={() =>
                onUpdateQuantity(
                  item.productId,
                  item.quantity + 1
                )
              }
              className="w-9 h-9 bg-white rounded-full"
            >
              +
            </button>

          </div>


          {/* Price */}
          <div className="text-right">

            <p className="text-2xl font-bold">

              ₹{item.totalPrice}

            </p>

            <p className="text-xs text-gray-500">

              ₹{item.unitPrice} each

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default BulkCartItems;
