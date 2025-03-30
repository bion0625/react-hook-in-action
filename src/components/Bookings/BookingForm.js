import { Fragment } from "react";
import useFormState from "../Bookables/useFormState";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const BookingForm = ({booking, bookable, onSave, onDelete}) => {
    const {state, handleChange} = useFormState(booking);
    const isNew = booking?.id == undefined;

    return booking ? (
        <Fragment>
            <div className="booking-details-fields item-form">
                <label>title</label>
                <p>
                    <input type="text" name="title" value={state.title} onChange={handleChange}/>
                </p>

                <label>Bookable</label>
                <p>{bookable.title}</p>

                <label>Booking date</label>
                <p>{(new Date(booking.date)).toLocaleDateString()}</p>
                
                <label>Session</label>
                <p>{booking.session}</p>

                <label>Notes</label>
                <p>
                    {/* <textarea name="notes" rows={6} cols={30} value={booking.notes} onChange={handleChange}/> */}
                    {/* 한번 정하면 수정이 안되서 예제와 다르게 감, 확인되면 아랫줄 제거 윗줄 주석 해제 */}
                    <textarea name="notes" rows={6} cols={30} value={state.notes} onChange={handleChange}/>
                </p>
            </div>

            <p className="controls">
                {!isNew && (
                    <button className="btn btn-delete" onClick={() => onDelete(booking)}>
                        <FaTrash/>
                        <span>Delete</span>
                    </button>
                )}
                <button className="btn" onClick={() => onSave(state)}>
                    <FaCloudUploadAlt/>
                    <span>{isNew ? "Add Booking" : "Update"}</span>
                </button>
            </p>
        </Fragment>
    ) : null;
};

export default BookingForm;