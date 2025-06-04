import Button from "@/src/common/Design_Components/Button";
import { ButtonSize } from "@/src/common/Design_Components/Button/Button.types";
import { handleDateInputChange } from "@/src/utils/functions";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

const CalenderFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}) => {
  const [inputStartDate, setInputStartDate] = useState(startDate);
  const [inputEndDate, setInputEndDate] = useState(endDate);

  const [commonError, setCommonError] = useState<string | null>("");

  useEffect(() => {
    setInputStartDate(startDate);
    setInputEndDate(endDate);
  }, [startDate, endDate]);

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(dateString);
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      if (month < 1 || month > 12) {
        setCommonError("Month must be between 01 and 12");
        return false;
      }
      if (day < 1 || day > 31) {
        setCommonError("Day must be between 01 and 31");
        return false;
      }
      if (month === 2 && day > 29) {
        setCommonError("February cannot have more than 29 days");
        return false;
      }
    }
    return (
      date instanceof Date &&
      !isNaN(date.getTime()) &&
      dateString === date.toISOString().slice(0, 10)
    );
  };

  const onApplyFilter = () => {
    if (!isValidDate(inputStartDate) || !isValidDate(inputEndDate)) {
      return;
    }

    const parsedStartDate = new Date(inputStartDate);
    const parsedEndDate = new Date(inputEndDate);

    if (parsedEndDate > new Date()) {
      setCommonError("End date cannot be in the future");
      return;
    }

    if (parsedEndDate < parsedStartDate) {
      setCommonError("End date cannot be before start date");
      return;
    }
    if (
      parsedEndDate.getTime() - parsedStartDate.getTime() >
      7 * 24 * 60 * 60 * 1000
    ) {
      setCommonError("Maximum range is 7 days");
      return;
    }
    onStartDateChange(inputStartDate);
    onEndDateChange(inputEndDate);
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      <Text style={{ color: "#ff5370", fontSize: 18, fontWeight: "bold" }}>
        (Max 7 days range)
      </Text>
      <View style={{ height: 16 }} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginRight: 8 }}>From:</Text>
          <View style={{ height: 8 }} />
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              width: 120,
              textAlign: "center",
            }}
            value={inputStartDate}
            onChangeText={(event) =>
              handleDateInputChange(event, setInputStartDate)
            }
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginHorizontal: 8 }}>To:</Text>
          <View style={{ height: 8 }} />
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              width: 120,
              textAlign: "center",
            }}
            value={inputEndDate}
            onChangeText={(event) =>
              handleDateInputChange(event, setInputEndDate)
            }
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={{ height: 16 }} />
      {!!commonError && (
        <>
          <Text style={{ color: "#ff5370", textAlign: "center" }}>
            {commonError}
          </Text>
          <View style={{ height: 16 }} />
        </>
      )}
      <Button
        title="Apply Filter"
        size={ButtonSize.LARGE}
        onClick={onApplyFilter}
      />
    </View>
  );
};

export default CalenderFilter;
