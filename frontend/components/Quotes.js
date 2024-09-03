import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHighlightedQuote, toggleVisibility } from "../state/quotesSlice";
import {
  useGetQuotesQuery,
  useDeleteQuoteMutation,
  useToggleFakeMutation,
} from "../state/quotesApi";

export default function Quotes() {
  //rtk query
  const {
    data: quotes,
    isLoading: quotesLoading,
    isFetching: quotesRefreshing,
  } = useGetQuotesQuery();
  const [deleteQuote, { error: deleteError }] = useDeleteQuoteMutation();
  const [toggleFake, { error: toggleError, isLoading: toggleLoading }] =
    useToggleFakeMutation();
  const displayAllQuotes = useSelector((st) => st.quotesState.displayAllQuotes);
  const highlightedQuote = useSelector((st) => st.quotesState.highlightedQuote);
  const dispatch = useDispatch();
  return (
    <div id="quotes">
      <h3>
        Quotes {toggleLoading || (quotesRefreshing && "being updated...")}
      </h3>
      <div>
        {quotes
          ?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          })
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ""}${
                highlightedQuote === qt.id ? " highlight" : ""
              }`}
            >
              {deleteError && <div>{deleteError.data.message}</div>}
              <div>{qt.quoteText}</div>
              <div>{qt.authorName}</div>
              <div className="quote-buttons">
                <button
                  onClick={() => {
                    deleteQuote(qt.id);
                  }}
                >
                  DELETE
                </button>
                <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>
                  HIGHLIGHT
                </button>
                <button
                  onClick={() => {
                    const id = qt.id;
                    const isFake = !qt.apocryphal;
                    toggleFake({ id, isFake });
                  }}
                >
                  FAKE
                </button>
              </div>
            </div>
          ))}
        {!quotes?.length && "No quotes here! Go write some."}
      </div>
      {!!quotes?.length && (
        <button onClick={() => dispatch(toggleVisibility())}>
          {displayAllQuotes ? "HIDE" : "SHOW"} FAKE QUOTES
        </button>
      )}
    </div>
  );
}
