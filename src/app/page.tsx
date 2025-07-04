
'use client';
import Image from "next/image";
import React from "react";

export default function Home() {
  const [data, setData] = React.useState({
    "carSeatsNo": 7,
    "carSeatsRows": 3,
      "seats": [
    { "id": 1, "row": 1, "column": 3, "rank": 1, "excludedPassengers": ["Noam"] , includeInLottery: true },
    { "id": 2, "row": 2, "column": 1, "rank": 2, "excludedPassengers": [] , includeInLottery: true },
    { "id": 3, "row": 2, "column": 2, "rank": 3, "excludedPassengers": [] , includeInLottery: true },
    { "id": 4, "row": 2, "column": 3, "rank": 2, "excludedPassengers": [] , includeInLottery: true },
    { "id": 5, "row": 3, "column": 1, "rank": 3, "excludedPassengers": [] , includeInLottery: true },
    { "id": 6, "row": 3, "column": 2, "rank": 4, "excludedPassengers": [] , includeInLottery: true },
    { "id": 7, "row": 3, "column": 3, "rank": 3, "excludedPassengers": [] , includeInLottery: true  }
  ],
  "passengers": [
    { "name": "passenger1", "excludedRanks": [1], "excludedSeats": [3,6], includeInLottery: true },
    { "name": "passenger2", "excludedRanks": [1], "excludedSeats": [3,5,6,7], includeInLottery: true },
    { "name": "passenger3", "excludedRanks": [], "excludedSeats": [], includeInLottery: true },
    { "name": "passenger4", "excludedRanks": [], "excludedSeats": [], includeInLottery: true },
    { "name": "passenger5", "excludedRanks": [], "excludedSeats": [], includeInLottery: true },
    { "name": "passenger6", "excludedRanks": [], "excludedSeats": [1], includeInLottery: true },
    { "name": "passenger7", "excludedRanks": [], "excludedSeats": [1], includeInLottery: true },
  ],
 
});

  // Load data from localStorage on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('carSeatLotteryData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  React.useEffect(() => {
    localStorage.setItem('carSeatLotteryData', JSON.stringify(data));
  }, [data]);

  const toggleSeatInLottery = (seatId: number) => {
    setData(prevData => ({
      ...prevData,
      seats: prevData.seats.map(seat =>
        seat.id === seatId
          ? { ...seat, includeInLottery: !seat.includeInLottery }
          : seat
      )
    }));
  };

  const togglePassengerInLottery = (passengerIndex: number) => {
    setData(prevData => ({
      ...prevData,
      passengers: prevData.passengers.map((passenger, index) =>
        index === passengerIndex
          ? { ...passenger, includeInLottery: !passenger.includeInLottery }
          : passenger
      )
    }));
  };

  const togglePassengerExcludedSeat = (passengerIndex: number, seatId: number) => {
    setData(prevData => ({
      ...prevData,
      passengers: prevData.passengers.map((passenger, index) => {
        if (index === passengerIndex) {
          const excludedSeats = passenger.excludedSeats.includes(seatId)
            ? passenger.excludedSeats.filter(id => id !== seatId)
            : [...passenger.excludedSeats, seatId];
          return { ...passenger, excludedSeats };
        }
        return passenger;
      })
    }));
  };

  const togglePassengerExcludedRank = (passengerIndex: number, rank: number) => {
    setData(prevData => ({
      ...prevData,
      passengers: prevData.passengers.map((passenger, index) => {
        if (index === passengerIndex) {
          const excludedRanks = passenger.excludedRanks.includes(rank)
            ? passenger.excludedRanks.filter(r => r !== rank)
            : [...passenger.excludedRanks, rank];
          return { ...passenger, excludedRanks };
        }
        return passenger;
      })
    }));
  };

  // Get unique ranks from all seats
  const availableRanks = [...new Set(data.seats.map(seat => seat.rank))].sort();

  const [lotteryResults, setLotteryResults] = React.useState<{[seatId: number]: string}>({});
  const [editingPassenger, setEditingPassenger] = React.useState<number | null>(null);
  const [editingName, setEditingName] = React.useState<string>("");
  const [newPassengerName, setNewPassengerName] = React.useState<string>("");

  // Load lottery results from localStorage on component mount
  React.useEffect(() => {
    const savedResults = localStorage.getItem('carSeatLotteryResults');
    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setLotteryResults(parsedResults);
      } catch (error) {
        console.error('Error loading lottery results from localStorage:', error);
      }
    }
  }, []);

  // Save lottery results to localStorage whenever results change
  React.useEffect(() => {
    localStorage.setItem('carSeatLotteryResults', JSON.stringify(lotteryResults));
  }, [lotteryResults]);

  const runLottery = () => {
    const eligiblePassengers = data.passengers.filter(p => p.includeInLottery);
    const availableSeats = data.seats.filter(s => s.includeInLottery);
    const results: {[seatId: number]: string} = {};

    // Create a copy of passengers to track who's already assigned
    let unassignedPassengers = [...eligiblePassengers];

    // Sort passengers by number of excluded seats (most excluded first)
    // This ensures passengers with more restrictions get priority
    unassignedPassengers.sort((a, b) => {
      const aExcluded = a.excludedSeats.length;
      const bExcluded = b.excludedSeats.length;
      
      // If both have more than 3 excluded seats, sort by most excluded first
      if (aExcluded > 3 && bExcluded > 3) {
        return bExcluded - aExcluded;
      }
      
      // If one has more than 3 excluded seats, prioritize them
      if (aExcluded > 3) return -1;
      if (bExcluded > 3) return 1;
      
      // Otherwise, sort by most excluded first
      return bExcluded - aExcluded;
    });

    // Sort seats by rank (lower rank = better seat)
    const sortedSeats = availableSeats.sort((a, b) => a.rank - b.rank);

    // Process passengers in priority order
    for (const passenger of unassignedPassengers) {
      // Find all seats this passenger can sit in
      const availableSeatsForPassenger = sortedSeats.filter(seat => {
        // Skip if seat is already assigned
        if (results[seat.id]) return false;
        
        // Check if passenger is excluded from this seat
        if (passenger.excludedSeats.includes(seat.id)) return false;
        
        // Check if passenger is excluded from this rank
        if (passenger.excludedRanks.includes(seat.rank)) return false;
        
        // Check if seat excludes this passenger
        if (seat.excludedPassengers.includes(passenger.name)) return false;
        
        return true;
      });

      if (availableSeatsForPassenger.length > 0) {
        // For passengers with many exclusions, give them the best available seat
        // For others, randomize among available seats
        let selectedSeat;
        
        if (passenger.excludedSeats.length > 3) {
          // Give best available seat (lowest rank)
          selectedSeat = availableSeatsForPassenger[0];
        } else {
          // Random selection from available seats
          const randomIndex = Math.floor(Math.random() * availableSeatsForPassenger.length);
          selectedSeat = availableSeatsForPassenger[randomIndex];
        }
        
        results[selectedSeat.id] = passenger.name;
      }
    }

    setLotteryResults(results);
  };

  const clearLottery = () => {
    setLotteryResults({});
  };

  const resetAllData = () => {
    const confirmed = window.confirm('האם אתה בטוח שאתה רוצה לאפס את כל הנתונים? פעולה זו לא ניתנת לביטול.');
    if (confirmed) {
      // Clear localStorage
      localStorage.removeItem('carSeatLotteryData');
      localStorage.removeItem('carSeatLotteryResults');
      
      // Reset to default data
      setData({
        "carSeatsNo": 7,
        "carSeatsRows": 3,
        "seats": [
          { "id": 1, "row": 1, "column": 3, "rank": 1, "excludedPassengers": ["Noam"], "includeInLottery": true },
          { "id": 2, "row": 2, "column": 1, "rank": 2, "excludedPassengers": [], "includeInLottery": true },
          { "id": 3, "row": 2, "column": 2, "rank": 3, "excludedPassengers": [], "includeInLottery": true },
          { "id": 4, "row": 2, "column": 3, "rank": 2, "excludedPassengers": [], "includeInLottery": true },
          { "id": 5, "row": 3, "column": 1, "rank": 3, "excludedPassengers": [], "includeInLottery": true },
          { "id": 6, "row": 3, "column": 2, "rank": 4, "excludedPassengers": [], "includeInLottery": true },
          { "id": 7, "row": 3, "column": 3, "rank": 3, "excludedPassengers": [], "includeInLottery": true }
        ],
        "passengers": [
          { "name": "passenger1", "excludedRanks": [1], "excludedSeats": [3,6], "includeInLottery": true },
          { "name": "passenger2", "excludedRanks": [1], "excludedSeats": [3,5,6,7], "includeInLottery": true },
          { "name": "passenger3", "excludedRanks": [], "excludedSeats": [], "includeInLottery": true },
          { "name": "passenger4", "excludedRanks": [], "excludedSeats": [], "includeInLottery": true },
          { "name": "passenger5", "excludedRanks": [], "excludedSeats": [], "includeInLottery": true },
          { "name": "passenger6", "excludedRanks": [], "excludedSeats": [1], "includeInLottery": true },
          { "name": "passenger7", "excludedRanks": [], "excludedSeats": [1], "includeInLottery": true },
        ],
      });
      
      // Clear lottery results
      setLotteryResults({});
    }
  };

  const startEditingPassenger = (index: number, currentName: string) => {
    setEditingPassenger(index);
    setEditingName(currentName);
  };

  const savePassengerName = (index: number) => {
    if (editingName.trim()) {
      setData(prevData => ({
        ...prevData,
        passengers: prevData.passengers.map((passenger, i) =>
          i === index ? { ...passenger, name: editingName.trim() } : passenger
        )
      }));
    }
    setEditingPassenger(null);
    setEditingName("");
  };

  const cancelEditingPassenger = () => {
    setEditingPassenger(null);
    setEditingName("");
  };

  const addNewPassenger = () => {
    if (newPassengerName.trim()) {
      setData(prevData => ({
        ...prevData,
        passengers: [
          ...prevData.passengers,
          {
            name: newPassengerName.trim(),
            excludedRanks: [],
            excludedSeats: [],
            includeInLottery: true
          }
        ]
      }));
      setNewPassengerName("");
    }
  };

  const removePassenger = (index: number) => {
    const confirmed = window.confirm(`האם אתה בטוח שאתה רוצה למחוק את ${data.passengers[index].name}?`);
    if (confirmed) {
      setData(prevData => ({
        ...prevData,
        passengers: prevData.passengers.filter((_, i) => i !== index)
      }));
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start" dir="rtl">

        <h1 className="text-2xl font-bold">הגרלת כסאות ברכב</h1>
        <p className="text-lg">ברוכים הבאים לאפליקציית הגרלת כסאות הרכב!</p>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">כסאות הרכב</h2>
          
          {/* Lottery Controls */}
          <div className="flex gap-4 justify-center mb-4">
            <button
              onClick={runLottery}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg"
            >
              🎲 הפעל הגרלה
            </button>
            <button
              onClick={clearLottery}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium shadow-lg"
            >
              🗑️ נקה הגרלה
            </button>
            <button
              onClick={resetAllData}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-lg"
            >
              🔄 איפוס הכל
            </button>
          </div>
          <div className="relative bg-gradient-to-b from-gray-300 to-gray-600 rounded-3xl p-8 shadow-2xl" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Cpath d='M50 50 Q50 30 70 30 L230 30 Q250 30 250 50 L250 350 Q250 370 230 370 L70 370 Q50 370 50 350 Z' fill='%23f0f0f0' stroke='%23d0d0d0' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}>
            {/* Car layout with positioned seats */}
            <div className="relative w-full max-w-md mx-auto" dir="ltr">
              {/* Create a grid for 3 rows */}
              {[1, 2, 3].map(row => (
                <div key={row} className="flex justify-center gap-4 mb-6">
                  {/* For each row, create columns 1-3 */}
                  {[1, 2, 3].map(col => {
                    const seat = data.seats.find(s => s.row === row && s.column === col);
                    return (
                      <div key={`${row}-${col}`} className="w-20 h-20 flex items-center justify-center">
                        {seat ? (
                          <div 
                            className={`w-full h-full ${seat.includeInLottery ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} text-white rounded-lg flex flex-col items-center justify-center shadow-lg cursor-pointer transition-colors group relative`}
                            onClick={() => toggleSeatInLottery(seat.id)}
                          >
                            <div className="text-xs font-bold">{seat.id}</div>
                            <div className="text-xs">R{seat.rank}</div>
                            {!seat.includeInLottery && (
                              <div className="text-xs">❌</div>
                            )}
                            {/* Show assigned passenger */}
                            {lotteryResults[seat.id] && (
                              <div className="text-xs mt-1 font-bold bg-yellow-400 text-black px-1 rounded">
                                {lotteryResults[seat.id]}
                              </div>
                            )}
                            {/* Tooltip on hover */}
                            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                              כסא {seat.id} - שורה {seat.row}, עמודה {seat.column}<br/>
                              דרגה: {seat.rank}<br/>
                              {seat.excludedPassengers.length > 0 && `מוצאים: ${seat.excludedPassengers.join(", ")}`}<br/>
                              {seat.includeInLottery ? 'משתתף בהגרלה' : 'לא משתתף בהגרלה'}<br/>
                              {lotteryResults[seat.id] && `משובץ: ${lotteryResults[seat.id]}`}<br/>
                              <span className="text-yellow-300">לחץ כדי לשנות</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full border-2 border-dashed border-gray-400 rounded-lg opacity-30"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold">נוסעים</h2>
          
          {/* Add New Passenger */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
            <div className="flex gap-2 items-center" dir="rtl">
              <input
                type="text"
                value={newPassengerName}
                onChange={(e) => setNewPassengerName(e.target.value)}
                placeholder="שם נוסע חדש"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addNewPassenger()}
              />
              <button
                onClick={addNewPassenger}
                disabled={!newPassengerName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                ➕ הוסף נוסע
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
            {data.passengers.map((passenger, index) => (
              <div key={index} className={`p-4 border rounded-lg shadow-md transition-all ${
                passenger.includeInLottery 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  {editingPassenger === index ? (
                    <div className="flex gap-2 flex-1">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-2 py-1 text-lg font-bold border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') savePassengerName(index);
                          if (e.key === 'Escape') cancelEditingPassenger();
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => savePassengerName(index)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEditingPassenger}
                        className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <h3 
                      className="font-bold text-lg cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => startEditingPassenger(index, passenger.name)}
                      title="לחץ לעריכת השם"
                    >
                      {passenger.name}
                    </h3>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePassengerInLottery(index)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        passenger.includeInLottery
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-500 text-white hover:bg-gray-600'
                      }`}
                    >
                      {passenger.includeInLottery ? '✓ משתתף' : '❌ לא משתתף'}
                    </button>
                    <button
                      onClick={() => removePassenger(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                      title="מחק נוסע"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>החרגה מדירוג:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {availableRanks.map(rank => (
                        <button
                          key={rank}
                          onClick={() => togglePassengerExcludedRank(index, rank)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            passenger.excludedRanks.includes(rank)
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          דרגה {rank}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <strong>מוחרג מכיסאות:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {data.seats.map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => togglePassengerExcludedSeat(index, seat.id)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            passenger.excludedSeats.includes(seat.id)
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {seat.id}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
