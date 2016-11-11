import {Component} from '../Base/Component';
import {ComponentOptions} from '../Base/ComponentOptions';
import {IComponentBindings} from '../Base/ComponentBindings';
import {IResultsComponentBindings} from '../Base/ResultsComponentBindings';
import {QueryEvents, IBuildingQueryEventArgs} from '../../events/QueryEvents';
import {Initialization, IInitializationParameters} from '../Base/Initialization';
import {IQueryResult} from '../../rest/QueryResult';
import {Assert} from '../../misc/Assert';
import {$$} from '../../utils/Dom';

export interface ICardActionBarOptions {
  hidden?: boolean;
}

/**
 * This component displays an action bar at the bottom of the card results (see
 * {@link ResultLayout}).
 *
 * By default, CardActionBar is toggleable, with its default state being hidden.
 */
export class CardActionBar extends Component {
  static ID = 'CardActionBar';

  parentResult: HTMLElement;

  /**
   * @componentOptions
   */
  static options: ICardActionBarOptions = {
    /**
     * Specifies if the action bar is hidden unless the cursor clicks its parent
     * `Result` component.
     *
     * By default, it is hidden and a visual indicator is appended to the parent
     * result.
     */
    hidden: ComponentOptions.buildBooleanOption({ defaultValue: true })
  };

  constructor(public element: HTMLElement, public options?: ICardActionBarOptions, bindings?: IComponentBindings, public result?: IQueryResult) {
    super(element, CardActionBar.ID, bindings);
    this.options = ComponentOptions.initComponentOptions(element, CardActionBar, options);

    this.parentResult = $$(this.element).closest('CoveoResult');
    Assert.check(this.parentResult !== undefined, 'ActionBar needs to be a child of a Result')

    if (this.options.hidden) {
      this.bindEvents();
      this.appendArrow();
    } else {
      this.element.style.transition = 'none';
      this.element.style.transform = 'none';
    }
  }

  /**
   * Show the ActionBar
   */
  public show() {
    $$(this.element).addClass('coveo-opened');
  }

  /**
   * Hide the ActionBar
   */
  public hide() {
    $$(this.element).removeClass('coveo-opened');
  }

  private bindEvents() {
    $$(this.parentResult).on('click', () => this.show());
    $$(this.parentResult).on('mouseleave', () => this.hide());
  }

  private appendArrow() {
    this.parentResult.appendChild(
      $$('div', { className: 'coveo-card-action-bar-arrow-container' },
        $$('span', { className: 'coveo-icon coveo-sprites-arrow-up' })).el
    );
  }
}

Initialization.registerAutoCreateComponent(CardActionBar);
