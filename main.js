(function() {

  const PEOPLE = [
    { $recipientName: undefined, name: "Emily" },
    { $recipientName: undefined, name: "Dan" },
    { $recipientName: undefined, name: "Brandon" },
    { $recipientName: undefined, name: "Jason" }
  ];

  const PEOPLE_WITHOUT_DAN = [
    { $recipientName: undefined, name: "Emily" },
    { $recipientName: undefined, name: "Brandon" },
    { $recipientName: undefined, name: "Jason" }
  ];



  let $_yearTextbox;
  let $_prevYearButton;
  let $_nextYearButton;

  let $_danRow;



  document.addEventListener('DOMContentLoaded', function() {
    $_yearTextbox    = document.querySelector('#yearTextbox');
    $_prevYearButton = document.querySelector('#prevYearButton');
    $_nextYearButton = document.querySelector('#nextYearButton');

    $_danRow = document.querySelector('#danRow');


    const populateRecipientNameElementFunc = function(person) {
      person.$recipientName = document.querySelector(`#${person.name.toLowerCase()}RecipientName`);
    };

    PEOPLE.forEach(populateRecipientNameElementFunc);
    PEOPLE_WITHOUT_DAN.forEach(populateRecipientNameElementFunc);


    $_yearTextbox.addEventListener('input',  _onChangeYearTextbox);
    $_yearTextbox.addEventListener('change', _onChangeYearTextbox);

    $_prevYearButton.addEventListener('click', _onClickPrevYearButton);
    $_nextYearButton.addEventListener('click', _onClickNextYearButton);


    $_yearTextbox.value = moment().add(7, 'days').get('year');


    _updateRecipients();
  });



  function _onChangeYearTextbox(e) {
    if ($_yearTextbox.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      _updateRecipients();
    }
  }


  function _onClickPrevYearButton() {
    if (!$_prevYearButton.disabled) {
      $_yearTextbox.value = ($_yearTextbox.valueAsNumber - 1);
      $_yearTextbox.dispatchEvent(new Event('change'));
    }
  }


  function _onClickNextYearButton() {
    if (!$_nextYearButton.disabled) {
      $_yearTextbox.value = ($_yearTextbox.valueAsNumber + 1);
      $_yearTextbox.dispatchEvent(new Event('change'));
    }
  }


  function _updateRecipients() {
    if (!$_yearTextbox.checkValidity()) {
      $_prevYearButton.disabled = true;
      $_nextYearButton.disabled = true;

      return;
    }


    const year = $_yearTextbox.valueAsNumber;

    let people;

    if (year < 2016) {
      people = PEOPLE;
      $_danRow.classList.remove('hidden');
    } else {
      people = PEOPLE_WITHOUT_DAN;
      $_danRow.classList.add('hidden');
    }


    people.forEach(function(giver, index) {
      giver.$recipientName.textContent = people[_getRecipientIndex(people.length, year, index)].name;
    });


    $_prevYearButton.disabled = (year === Number($_yearTextbox.min));
    $_nextYearButton.disabled = false;
  }



  function _getRecipientIndex(numOfPeople, year, giverIndex) {
    const numOfReceivers = (numOfPeople - 1);
    const rotationNumber = (year % numOfReceivers);

    return (Math.abs(giverIndex + 1 + rotationNumber) % numOfPeople);
  }
})();
