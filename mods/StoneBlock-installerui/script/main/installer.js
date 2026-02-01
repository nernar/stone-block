let context = (function() {
	return Packages.com.zhekasmirnov.horizon.HorizonApplication.getTopActivity();
})();

// See also: android.widget.RadioButton#setButtonDrawable
let installer$uiStateListRadio = function(bitmap) {
	let drawable = new android.graphics.drawable.StateListDrawable();
	let unchecked = new android.graphics.drawable.BitmapDrawable(bitmap);
	unchecked.setFilterBitmap(false);
	unchecked.setAntiAlias(false);
	let checked = unchecked.getConstantState().newDrawable().mutate();
	unchecked.setColorFilter(0x000000, android.graphics.PorterDuff.Mode.MULTIPLY);
	drawable.addState([-android.R.attr.state_checked], unchecked);
	drawable.addState([android.R.attr.state_checked], checked);
	return drawable;
};

let installer$uiDialog = function() {
	let dialog = new android.app.AlertDialog.Builder(context,
		android.R.style.Theme_DeviceDefault_DialogWhenLarge_NoActionBar);
	let scroll = new android.widget.ScrollView(context);
	scroll.setPadding(45, 10, 45, 10);
	
	return layout;
};

let installer$dialog$welcome = function(dialog) {
	dialog.setTitle("Средство установки StoneBlock");
	let layout = new android.widget.LinearLayout(context);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	layout.setGravity(android.view.View.Gravity.CENTER);
	let logotype = new android.widget.ImageView(context);
	logotype.setAdjustViewBounds(true);
	layout.addView(logotype);
	let description = new android.widget.TextView(context);
	description.setText("Привет! Давай установим StoneBlock на твое устройство. Мы уже начали загружать необходимые файлы для дальнейшей работы сборки.");
	description.setGravity(android.view.View.Gravity.CENTER);
	description.setTextSize(16);
	layout.addView(description);
	dialog.setPositiveButton("Начнем", function(di) {
		installer$step1();
	});
	return layout;
};

let installer$dialog$step1 = function(dialog) {
	dialog.setTitle("Ваши предпочтения (1/3)");
	let layout = new android.widget.LinearLayout(context);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	let group = new android.widget.RadioGroup(context);
	group.setOrientation(android.widget.RadioGroup.VERTICAL);
	group.setPadding(10, 10, 10, 10);
	layout.addView(group);
	let buttonStability = new android.widget.RadioButton(context);
	buttonStability.setText("Стабильность: плавная игра");
	group.addView(buttonStability);
	let buttonStoryline = new android.widget.RadioButton(context);
	buttonStoryline.setText("Квесты: последовательная игра");
	group.addView(buttonStoryline);
	let buttonImpression = new android.widget.RadioButton(context);
	buttonImpression.setText("Впечатления: и разнообразие");
	group.addView(buttonImpression);
	let checkMultiplayer = new android.widget.CheckBox(context);
	checkMultiplayer.setText("Мультиплеер: игра с друзьями");
	group.addView(checkMultiplayer);
	let description = new android.widget.TextView(context);
	description.setText("Сборка достаточно тяжелая и требует некоторого количество ресурсов для работы. Мы не ограничиваем вас в выборе вашей хотелки.");
	layout.addView(description);
	dialog.setPositiveButton("Продолжить", function(di) {
		installer$step2();
	});
	return layout;
};

let installer$dialog$step2 = function(dialog) {
	dialog.setTitle("Выберите вариант сборки (2/3)");
	let layout = new android.widget.LinearLayout(context);
	let group = new android.widget.RadioGroup(context);
	group.setOrientation(android.widget.RadioGroup.VERTICAL);
	group.setPadding(10, 10, 10, 10);
	layout.addView(group);
	let buttonStability = new android.widget.RadioButton(context);
	buttonStability.setButtonDrawable(installer$uiStateListRadio("stability"));
	group.addView(buttonStability);
	let buttonStoryline = new android.widget.RadioButton(context);
	buttonStoryline.setButtonDrawable(installer$uiStateListRadio("storyline"));
	group.addView(buttonStoryline);
	let buttonImpression = new android.widget.RadioButton(context);
	buttonImpression.setButtonDrawable(installer$uiStateListRadio("impression"));
	group.addView(buttonImpression);
	var recycler = new android.v4.widget.RecyclerView(context);
	layout.addView(recycler);
	dialog.setPositiveButton("Выбрать/Установка", function(di) {
		if (group != "custom")
			installer$step3();
		else installer$setup();
	});
	return layout;
};

let installer$dialog$step3 = function(dialog) {
	dialog.setTitle("Подтверждение установки (3/3)");
	let layout = new android.widget.LinearLayout(context);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	let description = new android.widget.TextView(context);
	description.setText("Сборка будет установлена в отдельную папку к остальным модпакам. Ваши текущие миры, модификации и настройки не пострадают. Моды объединены по категориям, если чего-то не хватает для работоспособности других, вы можете выбрать это дополнительно.");
	layout.addView(description);
	let recycler = new android.v4.widget.RecyclerView(context);
	layout.addView(recycler);
	dialog.setPositiveButton("Установка", function(di) {
		installer$setup();
	});
	return layout;
};

let installer$dialog$setup = function(dialog) {
	dialog.setTitle("Загрузка необходимых файлов");
	let layout = new android.widget.LinearLayout(context);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	layout.setGravity(android.view.View.Gravity.RIGHT);
	let progress = new android.widget.ProgressBar(context,
		null, android.R.atrprogressBarStyleHorizontal);
	layout.addView(progress);
	let procent = new android.widget.TextView(context);
	layout.addView(procent);
	let tip = new android.widget.TextView(context);
	tip.setGravity(android.view.View.Gravity.CENTER);
	tip.setText("А вы знали? Плохо не знать.");
	tip.setPadding(15, 15, 15, 0);
	tip.setTextSize(16);
	layout.addView(tip);
	dialog.setNegativeButton("Прервать", function(di) {
		progress.setIndeterminate(true);
	});
	return layout;
};

let installer$complete = function() {
	alert("No required, install complete");
};
