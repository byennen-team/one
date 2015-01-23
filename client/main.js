Transitioner.transition(Routes.LOGIN, Routes.DASHBOARD, 'slideUp');



Transitioner.transition(Routes.DASHBOARD, Routes.DIRECTORY, 'fade');
Transitioner.transition(Routes.DASHBOARD, Routes.APPS, 'fade');
Transitioner.transition(Routes.DIRECTORY, Routes.DASHBOARD, 'slideRight', {reverse: false});
Transitioner.transition(Routes.DIRECTORY, Routes.APPS, 'slideRight', {reverse: false});
Transitioner.transition(Routes.APPS, Routes.DIRECTORY, 'slideRight', {reverse: false});
Transitioner.transition(Routes.APPS, Routes.DASHBOARD, 'slideRight', {reverse: false});
