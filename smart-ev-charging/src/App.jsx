
import { useMemo, useState } from "react";
import "./App.css";

const stations = [
  {
    id: 1,
    name: "Evergreen Charging Hub",
    address: "Station Road, Mumbai",
    distance: 2.1,
    type: "DC Fast",
    price: 18,
    available: 3,
    total: 6,
    amenities: ["Food", "Washroom"],
    power: "120 kW",
  },
  {
    id: 2,
    name: "City Centre EV Point",
    address: "Near Central Mall, Mumbai",
    distance: 4.5,
    type: "AC",
    price: 12,
    available: 5,
    total: 8,
    amenities: ["Food", "Mall"],
    power: "22 kW",
  },
  {
    id: 3,
    name: "Highway Charge Station",
    address: "Western Express Highway",
    distance: 7.2,
    type: "DC Fast",
    price: 20,
    available: 1,
    total: 4,
    amenities: ["Washroom"],
    power: "150 kW",
  },
];

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [battery, setBattery] = useState(69);
  const [activeTab, setActiveTab] = useState("Charging Stations");
  const [bookingMessage, setBookingMessage] = useState("");

  const selectedStation = stations.find(
    (station) => station.id === selectedId
  );

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.name.toLowerCase().includes(search.toLowerCase()) ||
        station.address.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        station.type === filter ||
        station.amenities.includes(filter);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const estimatedRange = Math.round((battery / 100) * 390);

  function bookStation() {
    setBookingMessage(
      `Demo booking request created for ${selectedStation.name}.`
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">ϟ</span>
          <span>EV<span className="brand-light">HUB</span></span>
        </div>

        <p className="side-label">WORKSPACE</p>

        {["Home", "Charging Stations", "My Bookings", "Settings"].map(
          (item) => (
            <button
              key={item}
              className={`nav-item ${
                activeTab === item ? "active" : ""
              }`}
              onClick={() => {
                setActiveTab(item);
                setBookingMessage("");
              }}
            >
              <span>
                {{
                  Home: "⌂",
                  "Charging Stations": "ϟ",
                  "My Bookings": "▤",
                  Settings: "⚙",
                }[item]}
              </span>
              {item}
            </button>
          )
        )}

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <div>
            <strong>EV Network</strong>
            <small>Prototype mode</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR ELECTRIC JOURNEY</p>
            <h1>
              {activeTab === "Charging Stations"
                ? "Charging Stations"
                : activeTab}
            </h1>
            <p className="subheading">
              Find a charge. Get back on the road.
            </p>
          </div>
          <div className="profile">
            <span className="profile-avatar">EV</span>
            <span>Driver</span>
            <span>⌄</span>
          </div>
        </header>

        {activeTab === "Charging Stations" && (
          <>
            <section className="stats-row">
              <div className="stat-card">
                <span className="stat-icon">ϟ</span>
                <div>
                  <p>Stations listed</p>
                  <h2>{stations.length}</h2>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">↗</span>
                <div>
                  <p>Nearest station</p>
                  <h2>2.1 km</h2>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">✓</span>
                <div>
                  <p>Available ports</p>
                  <h2>
                    {stations.reduce(
                      (sum, station) => sum + station.available,
                      0
                    )}
                  </h2>
                </div>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel map-panel">
                <div className="panel-heading">
                  <div>
                    <h2>Station Proximity</h2>
                    <p>Select a station to see its details.</p>
                  </div>
                  <span className="live-tag">DEMO DATA</span>
                </div>

                <div className="map-visual">
                  <div className="map-road road-one" />
                  <div className="map-road road-two" />
                  <div className="map-road road-three" />
                  <div className="map-circle circle-one" />
                  <div className="map-circle circle-two" />
                  <div className="map-circle circle-three" />

                  <div className="car-marker">🚘</div>

                  {stations.map((station, index) => (
                    <button
                      key={station.id}
                      title={station.name}
                      className={`map-marker marker-${index + 1} ${
                        selectedId === station.id ? "chosen" : ""
                      }`}
                      onClick={() => {
                        setSelectedId(station.id);
                        setBookingMessage("");
                      }}
                    >
                      <span>ϟ</span>
                      <small>{station.distance} km</small>
                    </button>
                  ))}

                  <span className="map-caption">
                    Illustrative station positions
                  </span>
                </div>

                <div className="filter-area">
                  <label htmlFor="station-search">Search stations</label>
                  <input
                    id="station-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Enter station name or area..."
                  />

                  <label htmlFor="station-filter">Filter stations</label>
                  <select
                    id="station-filter"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                  >
                    <option value="All">All stations</option>
                    <option value="DC Fast">DC Fast</option>
                    <option value="AC">AC charging</option>
                    <option value="Food">Food nearby</option>
                    <option value="Washroom">Washroom nearby</option>
                    <option value="Mall">Mall nearby</option>
                  </select>
                </div>
              </div>

              <div className="station-column">
                <div className="section-title">
                  <div>
                    <h2>Nearby stations</h2>
                    <p>{filteredStations.length} matching stations</p>
                  </div>
                </div>

                {filteredStations.map((station) => (
                  <button
                    key={station.id}
                    className={`station-card ${
                      selectedId === station.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedId(station.id);
                      setBookingMessage("");
                    }}
                  >
                    <div className="station-top">
                      <div className="station-icon">ϟ</div>
                      <div className="station-name">
                        <h3>{station.name}</h3>
                        <p>{station.distance} km away</p>
                      </div>
                      <span className="arrow">↗</span>
                    </div>
                    <p className="station-address">{station.address}</p>
                    <div className="station-meta">
                      <span>
                        <small>CHARGER</small>
                        <strong>{station.type}</strong>
                      </span>
                      <span>
                        <small>PRICE</small>
                        <strong>₹{station.price}/kWh</strong>
                      </span>
                      <span>
                        <small>PORTS</small>
                        <strong>
                          {station.available}/{station.total}
                        </strong>
                      </span>
                    </div>
                    <div className="availability-track">
                      <div
                        style={{
                          width: `${
                            (station.available / station.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </button>
                ))}

                {filteredStations.length === 0 && (
                  <div className="empty-state">
                    <h3>No stations found</h3>
                    <p>Try another search or filter.</p>
                  </div>
                )}

                {selectedStation && (
                  <div className="panel selected-detail">
                    <p className="eyebrow">SELECTED STATION</p>
                    <h3>{selectedStation.name}</h3>
                    <p>{selectedStation.power} maximum rated power</p>
                    <button className="primary-button" onClick={bookStation}>
                      Request a demo booking
                    </button>
                    {bookingMessage && (
                      <p className="success-message" role="status">
                        {bookingMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            <section className="panel vehicle-panel">
              <div className="vehicle-illustration">
                <div className="battery-ring">
                  <div>
                    <span>ϟ</span>
                    <strong>{battery}%</strong>
                  </div>
                </div>
                <span className="vehicle-emoji">🚙</span>
              </div>

              <div className="vehicle-details">
                <p className="eyebrow">YOUR VEHICLE · DEMO PROFILE</p>
                <h2>Electric Vehicle</h2>
                <p className="vehicle-description">
                  Estimated range based on a sample 390 km full-charge range.
                </p>
                <div className="vehicle-metrics">
                  <div>
                    <small>BATTERY LEVEL</small>
                    <strong>{battery}%</strong>
                  </div>
                  <div>
                    <small>ESTIMATED RANGE</small>
                    <strong>{estimatedRange} km</strong>
                  </div>
                  <div>
                    <small>CHARGING STATUS</small>
                    <strong>Not charging</strong>
                  </div>
                </div>
                <label htmlFor="battery-slider">
                  Adjust sample battery level
                </label>
                <input
                  id="battery-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={battery}
                  onChange={(event) =>
                    setBattery(Number(event.target.value))
                  }
                />
              </div>
            </section>
          </>
        )}

        {activeTab === "Home" && (
          <section className="panel welcome-panel">
            <p className="eyebrow">WELCOME TO EVHUB</p>
            <h2>Your smarter charging journey starts here.</h2>
            <p>
              Explore sample charging stations, compare prices and check
              your estimated vehicle range.
            </p>
            <button
              className="primary-button"
              onClick={() => setActiveTab("Charging Stations")}
            >
              Explore charging stations
            </button>
          </section>
        )}

        {activeTab === "My Bookings" && (
          <section className="panel welcome-panel">
            <p className="eyebrow">BOOKING CENTRE</p>
            <h2>Demo booking requests</h2>
            <p>
              {bookingMessage ||
                "You have no submitted booking requests in this session."}
            </p>
            <button
              className="primary-button"
              onClick={() => setActiveTab("Charging Stations")}
            >
              Find a station
            </button>
          </section>
        )}

        {activeTab === "Settings" && (
          <section className="panel welcome-panel">
            <p className="eyebrow">PREFERENCES</p>
            <h2>Prototype settings</h2>
            <p>
              This first version uses sample station and vehicle data.
              Account settings and saved preferences can be added later.
            </p>
          </section>
        )}

        <footer>
          Smart EV Charging Network · Student project prototype · Sample data
        </footer>
      </main>
    </div>
  );
}

export default App;