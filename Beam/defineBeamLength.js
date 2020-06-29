'use strict';

beamLengthOkBtn.addEventListener('click', defineBeamLength);
beamLength.addEventListener('keydown', beamLengthCatchEnter);
beamLengthResetBtn.addEventListener('click', resetBeamLength);

inputE.addEventListener('change', function() {
  let value = +inputE.value;
  beam.E = (isNumeric(value) && value != 0) ? +inputE.value : 1;
  if (beamCounted) count(beam);
});

inputI.addEventListener('change', function() {
  let value = +inputI.value;
  beam.I = (isNumeric(inputI.value) && value != 0) ? +inputI.value : 1;
  if (beamCounted) count(beam);
});

deleteAll.onclick = resetBeamLength;

function defineBeamLength() {
  if (beam.length) {
    alert('Если хотите сменить длину балки, нажмите кнопку "Сбросить длину". \n \
  При этом все нагрузки и опоры будут автоматически удалены');
    beamLength.value = beam.length;
    return;
  }

  beamLength.value = beamLength.value.replace(',', '.');

  if (!isNumeric(beamLength.value) || beamLength.value < 0) {
    beamLength.classList.add('error');
    alert('Длина балки должна быть больше нуля');
    beam.length = 0;
    beamLength.focus();
    return;
  }

  beam.length = +beamLength.value;
  beamLength.classList.remove('error');
  enableFields(supportPosition);
  beam.drawBeam(canvas, c);

  return true;
}

function beamLengthCatchEnter(e) {
  if (e.code == 'Enter' || e.code == 'NumpadEnter' ||
    e.key == 'Enter' || e.keyCode == 13 || e.which == 13) beamLengthOkBtn.click();
}

function resetBeamLength() {
  beamLength.value = '';
  beam.length = 0;
  beam.supports.length = 0;
  beam.loads.length = 0;
  disableAllFields(3);
  enableFields(beamLength);

  clearFields(supportSelector, loadSelector, supportPosition,
    xStartSingle, valueStartSingle, xStart, xEnd,
    valueStart, valueEnd);
  clearMaxFactorsContainer();
  clearCanvases();
  clearIPFValues();

  beamCounted = false;
}
