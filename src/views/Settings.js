import React, { useState } from "react";
import styled from "styled-components";
import MainWrapper from "../components/atoms/MainWrapper/MainWrapper";
import TextWrapper from "../components/atoms/TextWrapper/TextWrapper";
import ChangeTheme from "../components/atoms/ChangeTheme/ChangeTheme";
import PeriodItem from "../components/atoms/PeriodItem/PeriodItem";
import AddPeriodic from "../components/organisms/AddPeriodic/AddPeriodic";
import Header from "../components/atoms/Header/Header";
import Footer from "../components/atoms/Footer/Footer";
import { addPeriodItem } from "../actions/actions";
import { connect } from "react-redux";

// const today = new Date();
// const day = today.getDate();
// const month = today.getMonth();
// const year = today.getFullYear();

// Sposób obliczania róznicy między dniem ustawienia elementu dodawanego cyklicznie, a dniem dzisiejszym
// const diff = mockItems[0].date - mockItems[1].date;
// const dzien_milisekundy = 1000 * 60 * 60 * 24;
// const diffData = Math.round(diff/dzien_milisekundy);

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 90%;
  max-width: 1100px;
  margin: 20px auto;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  width: 100px;
  margin: 10px auto;
  border-radius: 10px;
  padding: 10px 30px;
  color: white;
  background-color: teal;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: white;
    border: solid 2px teal;
    color: teal;
  }
`;

const Settings = ({ theme, fn, addItem, periodList }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <MainWrapper theme={theme}>
      {openForm && (
        <AddPeriodic
          close={() => setOpenForm(false)}
          handleSubmit={(payload) => addItem(payload)}
          theme={theme}
        />
      )}
      <Header title="Ustawienia" theme={theme} />
      <Columns>
        <Column>
          <ChangeTheme theme={theme} fn={fn} />
          <TextWrapper
            title="Cyklicznie dodawane produkty"
            theme={theme}
          ></TextWrapper>
          {periodList.map(
            (el) =>
              el.name !== "" && (
                <PeriodItem
                  theme={theme}
                  key={el.name}
                  name={el.name}
                  period={el.period}
                />
              )
          )}
          {/* 
                Sposób obliczania różnicy dni między dodaniem produktu cyklicznego a dniem obecnym
                <p>{mockItems[0].date.getDate()}.{mockItems[0].date.getMonth() + 1}.{mockItems[0].date.getFullYear()}</p>
                <p>{mockItems[1].date.getDate()}.{mockItems[1].date.getMonth() + 1}.{mockItems[1].date.getFullYear()}</p>
                <p>{diff} | {diffData}</p> */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpenForm(true);
            }}
          >
            Dodaj
          </Button>
        </Column>
        <Column>
          <TextWrapper title="Instrukcja" theme={theme}>
            Aplikacja pozwala na zapisywanie obecnego stanu naszej domowej
            spiżarni w zakładce "Zapasy". W zakładce "Lista zakupów" możemy
            tworzyć listy zakupów oraz obserwowac jak uszczuplone poniżej
            wyznaczonego minimum zapasy, same się do niej dopisują. Ponadto
            tutaj, na stronie ustawień, istnieje możliwość zmiany koloru motywu
            oraz dodatnia produktów cyklicznych, które będą dopisywane
            automatycznie do listy zakupów. Aplikacja do zapisywania
            wykorzystuje local storage, a więc dane są przechowywane w pamięciu
            urządzenia na którym korzystasz ze strony. Czyszczenie przeglądarki
            przy pomocy różnego rodzaju "cleanerów" usunie zapisane dane, więc
            pamiętaj by zrobić remament przed sprzątaniem swojej domowej
            spiżarni.
          </TextWrapper>
          <TextWrapper title="O aplikacji" theme={theme}>
            Aplikacja została stworzona w trakcie wyzwania "React w 10 dni".
            Celem wyzwania było przerobienie 16 godzin materiałów dotyczących
            tej biblioteki oraz wykonanie 3 praktycznych projektów według
            określonych wytycznych. Ta aplikacja miała wspierać domową spiżarnię
            użytkowników i umożliwić im wygodne kontrolowanie stanu lodówki oraz
            innych domowych spiżarek.
          </TextWrapper>
        </Column>
      </Columns>
      <Footer></Footer>
    </MainWrapper>
  );
};

const mapStateToProps = ({ theme, periodList }) => {
  return { theme, periodList };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch(addPeriodItem(payload)),
  };
};
const WrappedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);
export default WrappedSettings;
