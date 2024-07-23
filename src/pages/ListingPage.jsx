import { useState, useEffect } from "react";
import Cards from "../component/Cards";
import axios from "axios";
import Header from "../component/header";
import Footer from "../component/Footer";
import { Card } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function ListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tickets-73a3c-default-rtdb.firebaseio.com/events.json"
      );
      if (response.data) {
        const fetchedEvents = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setEvents(fetchedEvents);

        const uniqueLocations = [
          ...new Set(fetchedEvents.map((event) => event.details.location)),
        ];
        setUniqueLocations(uniqueLocations);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const filteredEvents = events.filter(
    (event) =>
      (selectedLocation === "" ||
        event.details.location === selectedLocation) &&
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#519341]" />
      </div>
    );
  }

  return (
    <main>
      <Header />
      {/******************************HeroSection in listing page******************************** */}
      <section className="flex flex-wrap items-center justify-center w-full h-20 shadow-lg gap-44 ">
        {/********************************search************************ */}
        <div className="my-3 xl:w-96">
          <div className="relative flex flex-wrap items-stretch w-full mb-4">
            <input
              type="search"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        {/****************************end search************************ */}
      </section>
      {/****************************** end HeroSection in listing page******************************** */}
      {/******************************************* */}
      <section className="flex flex-wrap justify-center gap-3 mt-5">
        <Card className="w-full max-w-[50rem] p-4 shadow-lg ">
          <div className="relative">
            <label
              htmlFor="location-select"
              className="block mb-2 text-lg font-semibold text-gray-700"
            >
              Select Location:
            </label>
            <div className="relative">
              <motion.select
                id="location-select"
                value={selectedLocation}
                onChange={handleSelectChange}
                onClick={handleDropdownToggle}
                className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2  transition duration-300 ease-in-out"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((location, index) => (
                  <option
                    key={index}
                    value={location}
                    className="py-2 px-4 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-green-100 focus:bg-green-200"
                  >
                    {location}
                  </option>
                ))}
              </motion.select>
              <div
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                {/* <ChevronDownIcon className="w-5 h-5 text-gray-500" /> */}
              </div>
            </div>
          </div>
        </Card>
      </section>
      {/***************************************** */}
      <section>
        <Cards events={filteredEvents} searchQuery={searchQuery} />
      </section>
      <Footer />
    </main>
  );
}

export default ListingPage;
