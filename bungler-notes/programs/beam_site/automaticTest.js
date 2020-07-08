function fillFields() {
  //Тесты для проверочных усилий брал из книги С.Н. Кривошапко "Строительная механика: лекции, семинары, расчетно-графические работы"
  /*
  beamLength.value = 2000; //начало проверок на корректность ввода нагрузок и опор
  beamLengthOkBtn.click();
  
  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();
  
  addSupportBtn.click();
  supportPosition.value = 1;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 0.5;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

 //Начало введения сосредоточенных нагрузок 
  addLoadBtn.click();
  loadType.selectedIndex = 0;
  loadType.dispatchEvent(automaticChange); 
  xStartSingle.value = 0.5;  
  valueStartSingle.value = 10;
  acceptLoad.click();
  
  addLoadBtn.click();
  loadType.selectedIndex = 0;
  xStartSingle.value = 0.1;
  valueStartSingle.value = -50;
  acceptLoad.click();
  
  addLoadBtn.click();
  loadType.selectedIndex = 0;
  xStartSingle.value = 0.8;
  valueStartSingle.value = 5;
  acceptLoad.click();
  
  //окончание введения сосредоточенных нагрузок
  
  //Начало введения моментов
  addLoadBtn.click();
  loadType.selectedIndex = 2;
  loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0;
  valueStartSingle.value = -5;
  acceptLoad.click();
  
  addLoadBtn.click();
  loadType.selectedIndex = 2;
  loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.5;
  valueStartSingle.value = 300;
  acceptLoad.click();
  
  addLoadBtn.click();
  loadType.selectedIndex = 2;
  loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.8;
  valueStartSingle.value = -500;
  acceptLoad.click();
  //Окончание введения моментов
  
  //начало введения распределенных нагрузок
  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange); 
  xStart.value = 0;
  xEnd.value = 1;
  valueStart.value = 100;
  valueEnd.value = 100;
  acceptLoad.click();
  
  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange); 
  xStart.value = 0.9;
  xEnd.value = 0.6;
  valueStart.value = 10;
  valueEnd.value = 10;
  acceptLoad.click();
  //Окончание введения распределенных нагрузок
  //конец проверок на корректность ввода нагрузок и опор 

*/
  /*
    beamLength.value = 1000; //к алгоритму расчета
    beamLengthOkBtn.click();
    
    addSupportBtn.click();
    supportPosition.value = 0;
    supportType.selectedIndex = 0;
    supportPositionOkBtn.click();
    
    addSupportBtn.click();
    supportPosition.value = 1;
    supportType.selectedIndex = 0;
    supportPositionOkBtn.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);
    measure.selectedIndex = 1;
    xStartSingle.value = 0.5;
    valueStartSingle.value = 1;
    acceptLoad.click();

    addSupportBtn.click();
    supportPosition.value = 0;
    supportType.selectedIndex = 0;
    supportPositionOkBtn.click();
  */
  //Начало проверок на совмещение отображения текста нагрузок
  /*
    beamLength.value = 1000;
    beamLengthOkBtn.click();

    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);   
    xStartSingle.value = 0.5;  
    valueStartSingle.value = 10;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);  
    xStartSingle.value = 0.8;  
    valueStartSingle.value = 1;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 1;
    loadType.dispatchEvent(automaticChange);   
    xStart.value = 0; 
    xEnd.value = 0.25  
    valueStart.value = -1000;
    valueEnd.value = -1000;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 1;
    loadType.dispatchEvent(automaticChange);   
    xStart.value = 0.8; 
    xEnd.value = 1  
    valueStart.value = 2;
    valueEnd.value = 2;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 2;
    loadType.dispatchEvent(automaticChange);   
    xStartSingle.value = 0.75;  
    valueStartSingle.value = 10; 
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 2;
    loadType.dispatchEvent(automaticChange);  
    xStartSingle.value = 0.8;  
    valueStartSingle.value = 3;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.63;
    valueStartSingle.value = 300;
    acceptLoad.click();
    
    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.65;
    valueStartSingle.value = 301;
    acceptLoad.click();
   
    addLoadBtn.click();
    loadType.selectedIndex = 0;
    loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.67;
    valueStartSingle.value = 302;
    acceptLoad.click();

    addLoadBtn.click();
    loadType.selectedIndex = 2;
    loadType.dispatchEvent(automaticChange);
    xStartSingle.value = 0.69;
    valueStartSingle.value = 200;
    acceptLoad.click();
    
    addSupportBtn.click();
    supportPosition.value = 0;
    supportType.selectedIndex = 0;
    supportPositionOkBtn.click();
    
    addSupportBtn.click();
    supportPosition.value = 1;
    supportType.selectedIndex = 1;
    supportPositionOkBtn.click();

    addSupportBtn.click();
    supportPosition.value = 0.6;
    supportType.selectedIndex = 1;
    supportPositionOkBtn.click();
  */
  //Test_1
  //К с. 237 
  beamLength.value = 6000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";
  measure.selectedIndex = 1;

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 2;
  supportPositionOkBtn.click();

  form.countFrom.value = "fromEnd";

  addSupportBtn.click();
  supportPosition.value = 4000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  form.countFrom.value = "fromBegin";
  form.distanceRelativity.value = "absolute";

  addSupportBtn.click();
  supportPosition.value = 5000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 0;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 6000;
  valueStartSingle.value = 2;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 2;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 3500;
  valueStartSingle.value = -6;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 2000;
  valueStart.value = 20;
  valueEnd.value = 20;
  acceptLoad.click();

  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 9.472 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1210)) != -5.1789 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -24.2083 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 2000)) != 2.315
  ) {
    throw new Error("error in Test_1");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_2
  //К с. 241
  //Так же не сходится с ответом, хотя у меня верно однозначно 
  beamLength.value = 9000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 2000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 6000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 8000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 0;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 9000;
  valueStartSingle.value = 2;
  acceptLoad.click();

  countBtn.click();
  form.distanceRelativity.value = "absolute";

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 6000)) != -0.375 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 8000)) != 2 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 8000)) != -2 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 6000)) != 1.187
  ) {
    throw new Error("error in Test_2");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_3
  //к примеру на с 242
  beamLength.value = 2000; //начало проверок на корректность ввода нагрузок и опор
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "relative";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 0.5;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();
  addLoadBtn.click();

  loadType.selectedIndex = 0;
  xStartSingle.value = 0.25;
  valueStartSingle.value = 2;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 500)) != -0.4062 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 500)) != 1.188 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1000)) != 0.1875 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1000)) != -0.1875
  ) {
    throw new Error("error in Test_3");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_4
  //к примеру на с 244
  beamLength.value = 2000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "relative";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 0.5;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();
  addLoadBtn.click();

  loadType.selectedIndex = 2;
  xStartSingle.value = 1;
  valueStartSingle.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1000)) != 2.5 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1000)) != -12.5 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1999.999)) != -10 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1999.999)) != -12.5
  ) {
    throw new Error("error in Test_4");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_5
  //к примеру на с 246
  //x1 = x2 = -1.1;
  beamLength.value = 3000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "relative";
  form.countFrom.value = "fromBegin";
  form.distanceRelativity.value = "relative";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1 / 3;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 2 / 3;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1;
  valueStart.value = 10;
  valueEnd.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 0 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -4 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 2600)) != -0.8 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 2600)) != 0 ||
    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1000)) != 1 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1000)) != -5
  ) {
    throw new Error("error in Test_5");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_6
  //К с.247 
  beamLength.value = 9000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 2;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 2000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 6000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 9000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  form.distanceRelativity.value = "absolute";

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 2000;
  valueStart.value = 3;
  valueEnd.value = 3;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();
  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 1.348 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -3.5217 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1174)) != -0.7193 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1174)) != 0.0003 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 2000)) != 0.3043 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 2000)) != -0.0978
  ) {
    throw new Error("error in Test_6");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_7
  //К с.261 
  beamLength.value = 2000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 2000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  form.distanceRelativity.value = "absolute";

  addLoadBtn.click();
  loadType.selectedIndex = 0;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 500;
  valueStartSingle.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();
  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 500)) != -2.0312 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 500)) != 5.938 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1000)) != 0.9375 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1000)) != -0.9375
  ) {
    throw new Error("error in Test_7");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_8
  //К с.264 
  beamLength.value = 3000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 2;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 2000;
  supportType.selectedIndex = 1;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 3000;
  supportType.selectedIndex = 2;
  supportPositionOkBtn.click();

  form.distanceRelativity.value = "absolute";

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1000;
  valueStart.value = 10;
  valueEnd.value = 10;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 2000;
  xEnd.value = 3000;
  valueStart.value = 10;
  valueEnd.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 1.111 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -5.8333 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 2417)) != -0.5903 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 2417)) != 0.0033
  ) {
    throw new Error("error in Test_8");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_9
  //Пример для расчета палубы
  beamLength.value = 1800;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 200;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 650;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1150;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1600;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1800;
  valueStart.value = 5.39;
  valueEnd.value = 5.39;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 200)) != 0.1078 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 200)) != -1.2276 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 900)) != -0.0673 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 900)) != 0 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 650)) != 0.1011 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 650)) != -1.3475
  ) {
    throw new Error("error in Test_9");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_10
  beamLength.value = 1000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 200;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 650;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 800;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1000;
  valueStart.value = 0;
  valueEnd.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 420)) != -0.0708 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 420)) != -0.0012 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 800)) != 0.1867 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 800)) != -1.8 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 600)) != 0.0067 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 600)) != 0.9168
  ) {
    throw new Error("error in Test_10");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_11
  beamLength.value = 3000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 3000;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 2000;
  valueStart.value = 0;
  valueEnd.value = 10;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 0 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -5.5556 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1491)) != -5.5212 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1491)) != 0.0021 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 2000)) != -4.4444 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 2000)) != 4.444
  ) {
    throw new Error("error in Test_11");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_12
  //Пример N31 из http://www.soprotmat.ru/izgib1.htm 
  beamLength.value = 7000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 1000;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 7000;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1000;
  valueStart.value = 10;
  valueEnd.value = 10;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 1000;
  xEnd.value = 5000;
  valueStart.value = 0;
  valueEnd.value = -40;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 0;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 5000;
  valueStartSingle.value = 20;
  acceptLoad.click();

  addLoadBtn.click();
  loadType.selectedIndex = 2;
  loadType.dispatchEvent(automaticChange);
  xStartSingle.value = 7000;
  valueStartSingle.value = -30;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 1000)) != 5 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 1000)) != 41.94 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 3896)) != 85.99 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 3896)) != 0.0104 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 4999.999)) != 66.11 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 4999.999)) != -38.0555
  ) {
    throw new Error("error in Test_12");
  }
  deleteAll.click();
  measure.selectedIndex = 1;

  //Test_13
  beamLength.value = 1000;
  beamLengthOkBtn.click();

  form.distanceRelativity.value = "absolute";
  form.countFrom.value = "fromBegin";

  addSupportBtn.click();
  supportPosition.value = 0;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 500;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addSupportBtn.click();
  supportPosition.value = 1000;
  supportType.selectedIndex = 0;
  supportPositionOkBtn.click();

  addLoadBtn.click();
  loadType.selectedIndex = 1;
  loadType.dispatchEvent(automaticChange);
  xStart.value = 0;
  xEnd.value = 1000;
  valueStart.value = 10;
  valueEnd.value = 0;
  acceptLoad.click();

  form.distanceRelativity.value = "absolute";
  countBtn.click();

  if (roundToFourSignificantDigits(countCurrentMoment(beamCounted, 0)) != 0 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 0)) != -1.7708 ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 196)) != -0.1676 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 196)) != -0.0029  ||

    roundToFourSignificantDigits(countCurrentMoment(beamCounted, 500)) != 0.1563 ||
    roundToFourSignificantDigits(countCurrentShareForce(beamCounted, 500)) != -1.1458 
  ) {
    throw new Error("error in Test_13");
  }
/*
  deleteAll.click();
  measure.selectedIndex = 1;
*/
}
