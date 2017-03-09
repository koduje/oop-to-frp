import Rx from 'rxjs';

export const once = (fn, context) => {
  let result;

  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
};

export const countTo = (source$, to) => source$.scan(
  counter => counter >= to ? 1 : counter + 1, 0
).filter(
  counter => counter === to
);

export const bufferCountOrTime = (source$, to, interval) => {
  const bufferBy$ = new Rx.Subject();

  const makeCounter$ = () => countTo(source$, to);
  const makeInterval$ = () => Rx.Observable.interval(interval);

  const observeCounterAndInterval = once(() => {
    makeInterval$().subscribe(
      () => bufferBy$.next()
    );
    makeCounter$().subscribe(
      () => bufferBy$.next()
    );
  });

  return source$
    .do(observeCounterAndInterval)
    .buffer(bufferBy$);
};

Rx.Observable.prototype.bufferCountOrTime = bufferCountOrTimeOperator;
function bufferCountOrTimeOperator(count, interval) {
  const source = this;

  return bufferCountOrTime(source, count, interval);
}
